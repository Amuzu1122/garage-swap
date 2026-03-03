type BtnBigTypes = {
  btnBg: string;
  textColor: string;
  text: string;
};

export default function BtnBig({ btnBg, textColor, text }: BtnBigTypes) {
  return (
    <div
      className={`py-3 ${btnBg} text-lg shadow-sm rounded-md text-center ${textColor}`}
    >
      {text}
    </div>
  );
}
