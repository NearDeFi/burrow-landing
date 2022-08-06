import Decimal from "decimal.js";
import millify from "millify";

const APY_FORMAT = {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

export const sumReducer = (sum: number, a: number) => sum + a;

const shrinkToken = (value: string | number, decimals: string | number, fixed?: number): string => {
  return new Decimal(value).div(new Decimal(10).pow(decimals)).toFixed(fixed);
};

const toUsd = (balance: string, asset) =>
  asset.price?.usd
    ? Number(shrinkToken(balance, asset.metadata.decimals + asset.config.extra_decimals)) *
      asset.price.usd
    : 0;

export const transformContractAssets = (assets, metadata, prices, refPrices) => {
  const transformedAssets = assets.reduce((map, asset, i) => {
    const price = prices.prices.find((p) => p.asset_id === asset.token_id);
    const usd = new Decimal(price?.price?.multiplier || 0).div(10000).toNumber();
    map[asset.token_id] = {
      ...asset,
      metadata: metadata[i],
      price: {
        ...price?.price,
        usd: usd ? usd : Number(refPrices[asset.token_id].price),
      },
    };
    return map;
  }, {});

  return transformedAssets;
};

export interface Asset {
  id: string;
  symbol: string;
  borrowAPR: string;
  tvl: string;
  icon: string;
}

const symbolTransform = {
  WBTC: "BTC",
  wNEAR: "NEAR",
};

export const transformAsset = (extraAPY) => (asset) => {
  const tvlDec = new Decimal(asset.supplied.balance)
    .plus(new Decimal(asset.reserved))
    .minus(new Decimal(asset.borrowed.balance))
    .toFixed(0);

  const tvl = millify(toUsd(tvlDec, asset));
  const symbol = symbolTransform[asset.metadata.symbol] || asset.metadata.symbol;

  return {
    id: asset.token_id,
    symbol,
    borrowAPR: (extraAPY + Number(asset.borrow_apr) * 100).toLocaleString(undefined, APY_FORMAT),
    tvl,
    icon: asset.metadata.icon,
  } as Asset;
};

const getTotalBalance = (assets, source: "borrowed" | "supplied") =>
  Object.keys(assets)
    .map((tokenId) => {
      const asset = assets[tokenId];
      const netTvlMultiplier = asset.config.net_tvl_multiplier / 10000;
      return (
        toUsd(asset[source].balance, asset) * netTvlMultiplier +
        (source === "supplied" ? toUsd(asset.reserved, asset) * netTvlMultiplier : 0)
      );
    })
    .reduce(sumReducer, 0);

export const computeExtraAPY = (assets, netLiquidityFarm) => {
  const totalDailyNetLiquidityRewards = Object.entries(netLiquidityFarm.rewards)
    .map(([tokenId, farm]: any) => {
      console.info(tokenId, farm);
      const asset = assets[tokenId];
      const assetDecimals = asset.metadata.decimals + asset.config.extra_decimals;
      const dailyAmount = Number(shrinkToken(farm.reward_per_day, assetDecimals));
      return dailyAmount * asset.price.usd * (asset.config.net_tvl_multiplier / 10000);
    })
    .reduce(sumReducer, 0);

  const supplied = getTotalBalance(assets, "supplied");
  const borrowed = getTotalBalance(assets, "borrowed");

  const totalProtocolLiquidity = supplied - borrowed;
  const netLiquidtyAPY = ((totalDailyNetLiquidityRewards * 365) / totalProtocolLiquidity) * 100;

  return netLiquidtyAPY;
};
