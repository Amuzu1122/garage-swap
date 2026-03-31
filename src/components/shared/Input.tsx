import type { ReactNode } from "react";

type inputTypes = {
  placeholder: string;
  icon: ReactNode;
  type?: string;
  required?: boolean;
  id?: string;
  name?: string;
  value?: string;
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordIcon?: ReactNode;
};
export default function Input({
  placeholder,
  icon,
  type = "text",
  required,
  id,
  name,
  value,
  onchange,
  passwordIcon,
}: inputTypes) {
  return (
    <div className="p-3 bg-white border rounded-md border-[#F48C2520] flex items-center gap-2 shadow-xs relative">
      {icon}
      <input
        className="outline-none flex-1 mr-10"
        type={type}
        placeholder={placeholder}
        required={required}
        id={id}
        name={name}
        value={value}
        onChange={onchange}
      />
      {passwordIcon}
    </div>
  );
}
