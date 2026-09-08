export interface NavItem {
  title: string;
  href: string;
  badge?: string;
}

export const mainNavItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Our Experts",
    href: "/experts",
    badge: "Verified",
  },
  {
    title: "Consultations",
    href: "/consultations",
  },
  {
    title: "How It Works",
    href: "/how-it-works",
  },
  {
    title: "FAQ",
    href: "/faq",
  },
];
