export interface LinkItem {
  name: string;
  to: string;
}

export const links: LinkItem[] = [
  { name: "Home", to: "/" },
  { name: "Parks", to: "/parks" },
];

export const mobileLinks: LinkItem[] = [...links];
