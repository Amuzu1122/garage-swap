import type { ReactNode } from "react";

type inputTypes = {
  placeholder: string;
  icon: ReactNode;
  type?: string;
  required?: boolean;
  id?: string;
  name?: string;
};
export default function Input({
  placeholder,
  icon,
  type = "text",
  required,
  id,
  name,
}: inputTypes) {
  return (
    <div className="p-2 bg-white border rounded-md border-[#F48C2520] flex items-center gap-2 shadow-xs">
      {icon}
      <input
        className="outline-none"
        type={type}
        placeholder={placeholder}
        required={required}
        id={id}
        name={name}
      />
    </div>
  );
}
