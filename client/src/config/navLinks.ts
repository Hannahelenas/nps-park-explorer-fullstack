export interface NavLink {
  name: string;
  to: string;
}

export const links: NavLink[] = [
  { name: "Home", to: "/" },
  { name: "Parks", to: "/parks" },
];

export const mobileLinks: NavLink[] = [
  { name: "Home", to: "/" },
  { name: "Parks", to: "/parks" },
  { name: "Log in", to: "/login" },
];
