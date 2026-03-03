import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./shared/Button";
import Input from "./shared/Input";
import { RiSearchLine, RiMenuLine, RiCloseLine } from "@remixicon/react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-40 py-4 font-[Inter] fixed top-0 left-0 right-0 w-full bg-[#f5f0e8] z-50">
      <div className="flex items-center gap-8">
        <span className="flex items-center gap-2">
          <span className="material-symbols-outlined font-extrabold text-[#f48c25]">
            handyman
          </span>
          <span className="text-xl lg:text-2xl font-bold text-slate-900">
            GarageSwap
          </span>
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
      <div className="flex flex-row items-center gap-8 pl-1">
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

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-[#fcfbfa] px-5 pb-5 flex flex-col gap-4">
          {/* Search */}
          <div className="pt-4">
            <Input
              placeholder="Search for an item"
              icon={<RiSearchLine color="#F48C25" />}
            />
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-1">
            <Link
              to="/"
              className="text-slate-700 font-medium py-2.5 px-1 border-b border-slate-100 hover:text-[#F48C25] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Browse
            </Link>
            <Link
              to="/"
              className="text-slate-700 font-medium py-2.5 px-1 border-b border-slate-100 hover:text-[#F48C25] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              How it Works
            </Link>
            <Link
              to="/"
              className="text-slate-700 font-medium py-2.5 px-1 hover:text-[#F48C25] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Start Selling
            </Link>
          </div>

          {/* Auth butons */}
          <div className="flex gap-3 pt-1">
            <Link
              to="/sign-in"
              className="flex-1"
              onClick={() => setMenuOpen(false)}
            >
              <Button
                text="Sign In"
                btnBg="bg-[#F48C2510]"
                textColor="text-[#F48C25]"
              />
            </Link>
            <Link
              to="/sign-in"
              className="flex-1"
              onClick={() => setMenuOpen(false)}
            >
              <Button
                text="Sign Up"
                btnBg="bg-[#F48C25]"
                textColor="text-white"
              />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
