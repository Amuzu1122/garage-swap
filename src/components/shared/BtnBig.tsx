import type { MouseEvent } from "react";

type BtnBigTypes = {
  btnBg: string;
  textColor: string;
  text: string;
  onsubmit?: (e: MouseEvent<HTMLButtonElement>) => void;
  onClick?: () => void;
};

export default function BtnBig({
  btnBg,
  textColor,
  text,
  onsubmit,
  onClick,
}: BtnBigTypes) {
  return (
    <button
      onClick={onsubmit ?? onClick}
      className={`py-3 ${btnBg} font-[Poppins] text-lg shadow-sm rounded-md cursor-pointer text-center transition-all duration-300 hover:shadow-none hover:bg-white hover:text-[#F48C25] hover:border hover:font-bold hover:border-[#F48C25] ${textColor} w-full`}
    >
      {text}
    </button>
  );
}
