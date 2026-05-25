export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Audio", href: "/audio" },
  { label: "eCommerce", href: "/ecommerce" },
  { label: "Mobile Apps", href: "/mobile-apps" },
  { label: "Casinos", href: "/casinos" },
  { label: "Other", href: "/other" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const SERVICE_ITEMS: NavItem[] = [
  { label: "Audio", href: "/audio" },
  { label: "eCommerce", href: "/ecommerce" },
  { label: "Mobile Apps", href: "/mobile-apps" },
  { label: "Casinos", href: "/casinos" },
  { label: "Other", href: "/other" },
];
