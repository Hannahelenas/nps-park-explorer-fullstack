import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollHandler from "./ScrollHandler";
import Breadcrumbs from "./Breadcrumbs";

export default function Layout() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const showBreadcrumbs = pathnames.length >= 2;

  return (
    <>
      <ScrollHandler />
      <Navbar />
      {showBreadcrumbs && <Breadcrumbs />}
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
