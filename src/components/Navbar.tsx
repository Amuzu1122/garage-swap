import { Link } from "react-router-dom";
import Button from "./shared/Button";
import Input from "./shared/input";
import { RiSearchLine } from "@remixicon/react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-60 py-4 font-[Inter]">
      <div className="flex items-center gap-8">
        <span className="flex items-center gap-2">
          <span className="material-symbols-outlined font-extrabold text-[#f48c25]">
            handyman
          </span>
          <span className="text-2xl font-bold text-slate-900">GarageSwap</span>
        </span>
        <Link to="/" className="text-slate-700 font-medium">
          Browse
        </Link>
        <Link to="/" className="text-slate-700 font-medium">
          How it Works
        </Link>
        <Link to="/" className="text-slate-700 font-medium">
          Start Selling
        </Link>
      </div>
      {/* right side below */}
      <div className="flex flex-row items-center gap-8">
        <Input
          placeholder="Search for an item"
          icon={<RiSearchLine color="#F48C25" />}
        />
        <Link to="/sign-in">
          <Button
            text="Sign Up"
            btnBg="bg-[#F48C2510] "
            textColor="text-[#F48C25]"
          />
        </Link>
        <Link to="/sign-in">
          <Button text="Sign Up" btnBg="bg-[#F48C25]" textColor="text-white" />
        </Link>
      </div>
    </nav>
  );
}
