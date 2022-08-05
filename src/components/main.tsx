import TokenIcon from "./token";
import { useAssets } from "~/hooks/burrow";

import { ReactComponent as HogSvg } from "~/assets/hog.svg";
import { ReactComponent as PointerSvg } from "~/assets/pointer.svg";
import { ReactComponent as TeethSvg } from "~/assets/teeth.svg";

export default function Main() {
  const { assets, selected, onSelect } = useAssets();

  return (
    <main className="grid relative">
      <div className="flex flex-col items-center justify-center text-white bg-bgblue">
        <h1 className="sm:text-[4.5rem] text-[3rem] font-semibold text-center">
          Burrow your <span className="text-greenish">${selected.symbol}</span>
        </h1>
        <h2 className="sm:text-[3.5rem] text-[2rem] font-semibold text-center">
          <span className="text-greenish">{selected.tvl}</span> TVL{" "}
          <span className="text-greenish">{selected.borrowAPR}%</span> APY
        </h2>
      </div>
      <PointerSvg className="w-[100%]" />
      <div className="flex justify-center items-end mb-[-32px]">
        <HogSvg />
      </div>
      <div className="absolute bottom-[90px] w-full overflow-auto noscroll">
        <div className="flex justify-center gap-[3.5rem] w-[3000px]">
          {assets.map((a) => (
            <TokenIcon
              key={a.id}
              {...a}
              className="cursor-pointer opacity-[0.4]"
              onClick={() => onSelect(a)}
            />
          ))}
        </div>
      </div>
      <TeethSvg className="absolute bottom-[152px] left-0 right-0 ml-auto mr-auto w-[32px]" />
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
