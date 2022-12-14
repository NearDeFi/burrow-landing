import * as nearAPI from "near-api-js";

import { CONTRACT_NAME } from "./config";
import { getWallet } from "./wallet";
import { transformContractAssets } from "~/utils";

export const ftContractCall = async ({ contractName = CONTRACT_NAME, method, args = {} }) => {
  const wallet = await getWallet();

  const contract = new nearAPI.Contract(wallet.account(), contractName, {
    viewMethods: [
      "get_asset",
      "get_assets_paged",
      "ft_metadata",
      "get_config",
      "get_price_data",
      "get_asset_farm",
    ],
    changeMethods: [],
  });

  return contract[method](args);
};

export const getAssets = async () => {
  const assets = await ftContractCall({ method: "get_assets_paged" });
  const tokenIds = assets.map(([id]) => id);

  const assetsDetailed = await Promise.all(
    tokenIds.map((token_id) => ftContractCall({ method: "get_asset", args: { token_id } })),
  );

  const metadata = await Promise.all(
    tokenIds.map((tokenId) => ftContractCall({ method: "ft_metadata", contractName: tokenId })),
  );

  const config = await ftContractCall({ method: "get_config" });

  const prices = await ftContractCall({
    method: "get_price_data",
    contractName: config["oracle_account_id"],
  });

  const refPrices = await fetch(
    "https://raw.githubusercontent.com/NearDeFi/token-prices/main/ref-prices.json",
  ).then((r) => r.json());

  const netLiquidityFarm = await ftContractCall({
    method: "get_asset_farm",
    args: { farm_id: "NetTvl" },
  });

  const transformedAssets = transformContractAssets(assetsDetailed, metadata, prices, refPrices);

  return [transformedAssets, netLiquidityFarm];
};
