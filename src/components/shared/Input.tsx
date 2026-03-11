import type { ReactNode } from "react";

type inputTypes = {
  placeholder: string;
  icon: ReactNode;
  type?: string;
  required?: boolean;
  id?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function Input({
  placeholder,
  icon,
  type = "text",
  required,
  id,
  name,
  value,
  onChange,
}: inputTypes) {
  return (
    <div className="p-2 bg-white border rounded-md border-[#F48C2520] flex items-center gap-2 shadow-xs">
      {icon}
      <input
        className="outline-none w-full"
        type={type}
        placeholder={placeholder}
        required={required}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
