import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api";

const NAV_LINKS = [
  { path: "/dashboard", label: "Home" },
  { path: "/profile", label: "Profile" },
  { path: "/faqs", label: "FAQs" },
];
const GITHUB_LINK = "https://github.com/debasmita2255/password-vault-v2.git";

const HamburgerLine = ({ isOpen, transform }) => (
  <span
    className={`h-0.5 w-full bg-current rounded-full transition-all duration-400 ${
      isOpen ? transform : ""
    }`}
  />
);

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = async () => {
    try {
      const res = await api.post("/users/logout");
      localStorage.removeItem("userLoggedIn");
      toast.success(res.data.success);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed.", error);
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  const getDesktopClass = (path) =>
    `nav-link ${location.pathname === path ? "nav-desktop-active" : "nav-desktop-inactive"}`;

  const getMobileClass = (path) =>
    `nav-link text-base ${location.pathname === path ? "nav-mobile-active" : "nav-mobile-inactive"}`;

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center px-4 pointer-events-none">
      <nav className="glass-card rounded-full pointer-events-auto flex w-full md:w-max max-w-[95vw] items-center justify-between gap-3 md:gap-15 px-4 py-2 md:px-8 md:py-3 transition-all duration-500">
        {/* hamburger icon trigger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex items-center justify-center p-2 text-gray-300 hover:text-white transition-colors duration-500 focus:outline-none"
        >
          <div className="flex flex-col justify-between w-5 h-3.5 cursor-pointer">
            <HamburgerLine
              isOpen={isMenuOpen}
              transform="rotate-45 translate-y-[6px]"
            />
            <HamburgerLine isOpen={isMenuOpen} transform="opacity-0" />
            <HamburgerLine
              isOpen={isMenuOpen}
              transform="-rotate-45 -translate-y-[6px]"
            />
          </div>
        </button>

        {/* logo */}
        <Link
          to="/dashboard"
          className="flex items-center select-none"
          onClick={closeMenu}
        >
          <h1 className="whitespace-nowrap text-base md:text-xl font-bold bg-linear-to-r from-white from-30% to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(99,102,241,0.4)] py-1">
            Password Vault
          </h1>
        </Link>

        {/* desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          {NAV_LINKS.map(({ path, label }) => (
            <Link key={path} to={path} className={getDesktopClass(path)}>
              {label}
            </Link>
          ))}
          <a
            href={GITHUB_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link nav-desktop-inactive"
          >
            GitHub
          </a>
        </div>

        {/* logout button */}
        <button
          onClick={logout}
          className="rounded-full bg-white/90 px-3 py-1.5 md:px-5 md:py-2 text-xs md:text-sm font-bold text-indigo-800 transition-all duration-500 hover:bg-white shadow-[0_0_10px_rgba(255,255,255,0.2)] whitespace-nowrap"
        >
          Logout
        </button>
      </nav>

      {/* mobile dropdown */}
      {isMenuOpen && (
        <div className="glass-card rounded-2xl pointer-events-auto mt-3 flex flex-col items-center gap-5 p-6 w-[85vw] max-w-sm md:hidden animate-page-enter shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
          {NAV_LINKS.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={getMobileClass(path)}
              onClick={closeMenu}
            >
              {label}
            </Link>
          ))}
          <a
            href={GITHUB_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link nav-mobile-inactive text-base"
            onClick={closeMenu}
          >
            GitHub
          </a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
