import { useEffect, useState } from "react";

import { getAssets } from "~/near";
import { Asset, transformAsset } from "~/utils";

const SELECTED_ASSETS = ["DAI", "WBTC", "USDC", "AURORA", "ETH", "USDT", "USN", "wNEAR"];

export const useAssets = () => {
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

  return assets;
};
