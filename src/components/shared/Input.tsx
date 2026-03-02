import type { ReactNode } from "react";

type inputTypes = {
  placeholder: string;
  icon: ReactNode;
};
export default function Input({ placeholder, icon }: inputTypes) {
  return (
    <div className="p-2 bg-white border rounded-md border-[#F48C2520] flex items-center gap-2">
      {icon}
      <input className="outline-none" type="text" placeholder={placeholder} />
    </div>
  );
}
