import Decimal from "decimal.js";
import millify from "millify";

const APY_FORMAT = {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

const shrinkToken = (value: string | number, decimals: string | number, fixed?: number): string => {
  return new Decimal(value).div(new Decimal(10).pow(decimals)).toFixed(fixed);
};

const toUsd = (balance: string, asset) =>
  asset.price?.usd
    ? Number(shrinkToken(balance, asset.metadata.decimals + asset.config.extra_decimals)) *
      asset.price.usd
    : 0;

export const transformContractAssets = (assets, metadata, prices) => {
  const transformedAssets = assets.reduce((map, asset, i) => {
    const price = prices.prices.find((p) => p.asset_id === asset.token_id);
    map[asset.token_id] = {
      ...asset,
      metadata: metadata[i],
      price: {
        ...price?.price,
        usd: new Decimal(price?.price?.multiplier || 0).div(10000).toNumber(),
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

export const transformAsset = (asset) => {
  const tvlDec = new Decimal(asset.supplied.balance)
    .plus(new Decimal(asset.reserved))
    .minus(new Decimal(asset.borrowed.balance))
    .toFixed(0);

  const tvl = millify(toUsd(tvlDec, asset));

  const symbol = symbolTransform[asset.metadata.symbol] || asset.metadata.symbol;

  return {
    id: asset.token_id,
    symbol,
    borrowAPR: (Number(asset.borrow_apr) * 100).toLocaleString(undefined, APY_FORMAT),
    tvl,
    icon: asset.metadata.icon,
  } as Asset;
};
