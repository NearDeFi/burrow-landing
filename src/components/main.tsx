import { useState, useEffect } from "react";
import { motion, animate, useMotionValue, AnimationOptions } from "framer-motion";

import TokenIcon from "./token";
import { useAssets } from "~/hooks/burrow";

import { ReactComponent as HogSvg } from "~/assets/hog.svg";
import { ReactComponent as PointerSvg } from "~/assets/pointer.svg";
import { ReactComponent as TeethSvg } from "~/assets/teeth.svg";

const INTERVAL = 3000;
const ASSET_WIDTH = 80;
const ASSET_GAP = 50;

const transition: AnimationOptions<any> = {
  type: "spring",
  bounce: 0.2,
};

export default function Main() {
  const { assets, selected, onSelect } = useAssets();
  const [index, setIndex] = useState(0);
  const x = useMotionValue(0);

  const calculateNewX = () =>
    window.innerWidth / 2 - ASSET_WIDTH / 2 - (ASSET_WIDTH + ASSET_GAP) * index;

  useEffect(() => {
    if (assets.length > 0) {
      onSelect(assets[index]);
    }
    const controls = animate(x, calculateNewX(), transition);
    return controls.stop;
  }, [index]);

  const handleNext = () => {
    setIndex(index + 1 === assets.length ? 0 : index + 1);
  };

  useEffect(() => {
    const timer = setInterval(() => handleNext(), INTERVAL);
    return () => clearInterval(timer);
  }, [handleNext]);

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
      <div className="absolute bottom-[90px] w-full overflow-clip noscrollbars">
        <motion.div style={{ marginLeft: x }} className="flex justify-center gap-[50px] w-[990px]">
          {assets.map((a, i) => (
            <TokenIcon
              key={a.id}
              {...a}
              className="cursor-pointer"
              style={{ opacity: index == i ? 1 : 0.5 }}
              onClick={() => {
                onSelect(a);
                setIndex(i);
              }}
            />
          ))}
        </motion.div>
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
