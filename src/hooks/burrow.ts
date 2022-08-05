import { useEffect, useState } from "react";

import { getAssets } from "~/near";
import { Asset, transformAsset } from "~/utils";

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
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    getAssets().then((a) =>
      setAssets(
        Object.entries(a)
          .map(([, asset]) => asset)
          .filter((asset: any) => SELECTED_ASSETS.includes(asset.metadata.symbol))
          .map(transformAsset),
      ),
    );
  }, []);

  useEffect(() => {
    if (assets.length > 0) {
      setSelectedAsset(assets[0]);
    }
  }, [assets]);

  const onSelect = (asset: Asset) => setSelectedAsset(asset);

  return { assets, selected, onSelect };
};
