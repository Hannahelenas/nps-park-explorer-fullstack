import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  const links = [
    { name: "Home", to: "/" },
    { name: "Parks", to: "/parks" },
  ];

  return (
    <footer className="relative text-center bg-[var(--color-primary)] pt-16">
      {/* Wave svg */}
      <div
        className="absolute top-[-0.5px] left-0 w-full overflow-hidden
      leading-none"
      >
        <svg
          aria-hidden="true"
          className="w-full h-auto transform rotate-y-180"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,
            168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,
            18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,
            321.39,56.44Z"
            className="fill-[var(--color-bg)]"
          />
        </svg>
      </div>

      {/* Footer content */}
      <section className="relative flex flex-col items-center py-8 md:py-15">
        <Link
          to="/"
          className="text-[var(--color-bg)] text-2xl md:text-3xl tracking-tighter
          font-bold xl:py-2 mb-6"
        >
          Park Explorer
        </Link>
        <p className="text-sm font-serif text-white mb-6">
          Made with curiosity and joy by Hanna.
        </p>
        <nav aria-label="Navigation links">
          <ul className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className="text-white font-serif text-lg underline-offset-2 
                sm:text-base hover:underline focus:underline transition"
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </footer>
  );
};

export default Footer;
