import { NavLink, useLocation, useParams } from "react-router-dom";
import { useParkData } from "../hooks/useParkData";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);
  const { parkCode } = useParams<{ parkCode: string }>();
  const { park } = useParkData(parkCode);

  const showParkName = park ? park.name : parkCode;

  return (
    <nav
      aria-label="Breadcrumb"
      className="px-5 sm:px-10 xl:px-5 py-2 sm:py-3 md:py-2 z-20 mt-20 md:mt-15 
      lg:mt-16 xl:mt-17 max-w-6xl mx-auto"
    >
      <ol
        className="flex items-center space-x-2 text-md 
      font-serif leading-relaxed text-[var(--color-text)]"
      >
        <li>
          <NavLink to="/" className="hover:underline">
            Home
          </NavLink>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;

          const displayRouteName =
            name.toLowerCase() === "parks" ? "Parks" : name;

          return (
            <li key={name} className="flex items-center">
              <span className="mx-2 ">/</span>
              {isLast ? (
                <span className="font-semibold text-[var(--color-text)]">
                  {showParkName}
                </span>
              ) : (
                <NavLink to={routeTo} className="hover:underline">
                  {displayRouteName}
                </NavLink>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
