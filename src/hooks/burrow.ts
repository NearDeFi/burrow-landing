import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import { getAssets } from "~/near";
import { Asset, computeExtraAPY, transformAsset } from "~/utils";

const SELECTED_ASSETS = ["DAI", "WBTC", "USDC", "AURORA", "ETH", "USDT", "USN", "wNEAR"];

const EMPTY_ASSET: Asset = {
  id: "---",
  symbol: "---",
  borrowAPR: "---",
  tvl: "---",
  icon: "---",
};

export const useAssets = () => {
  const [selected, setSelectedAsset] = useState<Asset>(EMPTY_ASSET);
  const [assets, setAssets] = useLocalStorage<Asset[]>("assets", []);

  useEffect(() => {
    getAssets().then(([allAssets, netLiquidityFarm]) => {
      const extraAPY = computeExtraAPY(allAssets, netLiquidityFarm);
      setAssets(
        Object.entries(allAssets)
          .map(([, asset]) => asset)
          .filter((asset: any) => SELECTED_ASSETS.includes(asset.metadata.symbol))
          .map(transformAsset(extraAPY)),
      );
    });
  }, []);

  useEffect(() => {
    if (assets.length > 0) {
      setSelectedAsset(assets[0]);
    }
  }, [assets]);

  const onSelect = (asset: Asset) => setSelectedAsset(asset);

  return { assets, selected, onSelect };
};
