type buttonType = {
  text: string;
  textColor: string;
  btnBg: string;
  onclick?: () => {};
};

export default function Button({ text, textColor, btnBg }: buttonType) {
  return (
    <div className={`py-2 px-4 ${btnBg} rounded-md ${textColor}`}>{text}</div>
  );
}
