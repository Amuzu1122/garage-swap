import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./shared/Button";
import Input from "./shared/Input";
import { RiSearchLine, RiMenuLine, RiCloseLine } from "@remixicon/react";
import { searchItems } from "../services/items";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const { data } = await searchItems(searchQuery.trim());
    // Navigate to home and pass the search results + query via router state
    navigate("/", { state: { searchResults: data ?? [], searchQuery } });
    setMenuOpen(false);
  };

  return (
    <nav className="font-[Inter] fixed top-0 left-0 right-0 w-full bg-[#f5f0e8] z-50">
      {/* Main bar */}
      <div className="flex items-center justify-between px-6 md:px-40 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="material-symbols-outlined font-extrabold text-[#f48c25]">
            handyman
          </span>
          <span className="text-xl lg:text-2xl font-bold text-slate-900">
            GarageSwap
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-slate-700 font-medium hover:text-[#F48C25] transition-colors"
          >
            Browse
          </Link>
          <Link
            to="/"
            className="text-slate-700 font-medium hover:text-[#F48C25] transition-colors"
          >
            How it Works
          </Link>
          <Link
            to="/"
            className="text-slate-700 font-medium hover:text-[#F48C25] transition-colors"
          >
            Start Selling
          </Link>
        </div>

        {/* Desktop right side */}
        <div className="hidden md:flex flex-row items-center gap-4 lg:gap-8">
          <form onSubmit={handleSearch}>
            <Input
              placeholder="Search for an item"
              icon={<RiSearchLine color="#F48C25" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          {user ? (
            <>
              <span className="text-sm text-slate-600 truncate max-w-[150px]">
                {user.email}
              </span>
              <button onClick={handleSignOut}>
                <Button
                  text="Sign Out"
                  btnBg="bg-[#F48C2510]"
                  textColor="text-[#F48C25]"
                />
              </button>
            </>
          ) : (
            <>
              <Link to="/sign-in">
                <Button
                  text="Sign In"
                  btnBg="bg-[#F48C2510]"
                  textColor="text-[#F48C25]"
                />
              </Link>
              <Link to="/sign-in">
                <Button
                  text="Sign Up"
                  btnBg="bg-[#F48C25]"
                  textColor="text-white"
                />
              </Link>
            </>
          )}
        </div>

        {/* Mobile: Sign Up button + Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          {user ? (
            <button onClick={handleSignOut}>
              <Button
                text="Sign Out"
                btnBg="bg-[#F48C2510]"
                textColor="text-[#F48C25]"
              />
            </button>
          ) : (
            <Link to="/sign-in">
              <Button
                text="Sign Up"
                btnBg="bg-[#F48C25]"
                textColor="text-white"
              />
            </Link>
          )}
          <button
            className="p-1.5 rounded-md text-slate-700 hover:bg-orange-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-orange-100 bg-[#f5f0e8] px-6 pb-5 flex flex-col gap-4">
          {/* Search */}
          <div className="pt-4">
            <form onSubmit={handleSearch}>
              <Input
                placeholder="Search for an item"
                icon={<RiSearchLine color="#F48C25" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Nav links */}
          <div className="flex flex-col">
            <Link
              to="/"
              className="text-slate-700 font-medium py-3 px-1 border-b border-orange-100 hover:text-[#F48C25] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Browse
            </Link>
            <Link
              to="/"
              className="text-slate-700 font-medium py-3 px-1 border-b border-orange-100 hover:text-[#F48C25] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              How it Works
            </Link>
            <Link
              to="/"
              className="text-slate-700 font-medium py-3 px-1 hover:text-[#F48C25] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Start Selling
            </Link>
          </div>

          {/* Auth buttons */}
          {user ? (
            <div className="flex flex-col gap-2 pt-1">
              <span className="text-sm text-slate-600 truncate">{user.email}</span>
              <button onClick={() => { handleSignOut(); setMenuOpen(false); }}>
                <Button
                  text="Sign Out"
                  btnBg="bg-[#F48C2510]"
                  textColor="text-[#F48C25]"
                  cursor="cursor-pointer"
                />
              </button>
            </div>
          ) : (
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
                  cursor="cursor-pointer"
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
                  cursor="cursor-pointer"
                />
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
