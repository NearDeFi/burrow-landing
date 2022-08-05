import { useAssets } from "~/hooks/burrow";

import { ReactComponent as HogSvg } from "~/assets/hog.svg";
import { ReactComponent as PointerSvg } from "~/assets/pointer.svg";

export default function Main() {
  const assets = useAssets();
  const asset = assets.sort(() => Math.random() - 0.5)[0];

  return (
    <main className="grid relative">
      <div className="flex flex-col items-center justify-center text-white bg-bgblue">
        <h1 className="sm:text-[4.5rem] text-[3rem] font-semibold text-center">
          Burrow your <span className="text-greenish">${asset?.symbol || "---"}</span>
        </h1>
        <h2 className="sm:text-[3.5rem] text-[2rem] font-semibold text-center">
          <span className="text-greenish">{asset?.tvl || "---"}</span> TVL{" "}
          <span className="text-greenish">{asset?.borrowAPR || "---"}%</span> APY
        </h2>
      </div>
      <PointerSvg className="w-[100%]" />
      <div className="flex justify-center items-end mb-[-32px]">
        <HogSvg />
      </div>
      <a
        className="absolute bottom-0 left-0 right-0 ml-auto mr-auto w-[160px] text-center bg-button text-white py-2 rounded-lg font-semibold"
        href="https://app.burrow.cash"
        title="Burrow Cash App"
      >
        Start Burrowing
      </a>
    </main>
  );
}
