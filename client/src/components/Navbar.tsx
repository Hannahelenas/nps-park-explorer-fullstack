import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../animations.css";
import FavouritesNavButton from "./common/FavouritesNavButton";
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";

const links = [
  { name: "Home", to: "/" },
  { name: "Parks", to: "/parks" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="w-full absolute top-0 bg-[var(--color-primary)] z-20 "
      aria-label="Main navigation"
    >
      <div
        className="max-w-6xl mx-auto py-4 md:py-2 grid grid-cols-1 
        lg:grid-cols-3 items-center pl-5 pr-2 sm:pl-10 sm:pr-7 xl:px-5"
      >
        {/* Logo text */}
        <Link
          to="/"
          className="text-[var(--color-bg)] text-2xl md:text-3xl 
          tracking-tighter font-bold xl:py-2 xl:pl-0"
        >
          Park Explorer
        </Link>
        {/* Desktop links */}
        <ul className="hidden lg:flex justify-center gap-8">
          {links.map((link) => (
            <li
              key={link.to}
              className="text-white hover:underline hover:underline-offset-2"
            >
              <NavLink
                to={link.to}
                end
                className={({ isActive }) =>
                  ` ${
                    isActive ? "underline underline-offset-2" : ""
                  } p-2 font-semibold leading-relaxed  `
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
        {/* Button container */}
        <div
          className="flex justify-end items-center gap-1 sm:gap-2 
        col-start-3 "
        >
          <Link
            to="/login"
            aria-label="Go to login"
            className="hidden lg:inline bg-[var(--color-bg)] border-2 
            border-[var(--color-primary)] px-5 py-2 rounded-full transition-all 
            duration-300 ease-in-out hover:bg-transparent 
            hover:text-[var(--color-bg)] hover:border-[var(--color-bg)]
             text-center"
          >
            Log in
          </Link>
          <FavouritesNavButton />
          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-3xl p-2 text-[var(--color-secondary)] 
            "
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <IoCloseOutline aria-hidden="true" focusable="false" />
            ) : (
              <IoMenuOutline aria-hidden="true" focusable="false" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navlink menu */}
      {menuOpen && (
        <div className="lg:hidden px-5 sm:px-10 pb-4 animate-slide-fade">
          <ul
            className="flex flex-col gap-4 text-[var(--color-secondary)] 
          font-serif"
          >
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block  ${isActive ? "underline underline-offset-2" : ""}`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
