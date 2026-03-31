import type { MouseEvent } from "react";

type BtnBigTypes = {
  btnBg: string;
  textColor: string;
  text: string;
  onsubmit?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export default function BtnBig({
  btnBg,
  textColor,
  text,
  onsubmit,
}: BtnBigTypes) {
  return (
    <button
      onClick={onsubmit}
      className={`py-3 ${btnBg} text-lg shadow-sm rounded-md cursor-pointer text-center transition-all duration-300 hover:shadow-none hover:bg-white hover:text-[#F48C25] hover:border hover:border-[#F48C25] ${textColor} w-full`}
    >
      {text}
    </button>
  );
}
