type BtnBigTypes = {
  btnBg: string;
  textColor: string;
  text: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export default function BtnBig({ btnBg, textColor, text, type = "button", disabled }: BtnBigTypes) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`py-3 ${btnBg} text-lg shadow-sm rounded-md text-center ${textColor} w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {text}
    </button>
  );
}
