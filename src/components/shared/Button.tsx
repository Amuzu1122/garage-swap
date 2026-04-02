type buttonType = {
  text: string;
  textColor: string;
  btnBg: string;
  onclick?: () => {};
  cursor?: string;
};

export default function Button({ text, textColor, btnBg, cursor }: buttonType) {
  return (
    <div className={`py-2 px-4 ${btnBg} rounded-md ${textColor} ${cursor}`}>{text}</div>
  );
}
