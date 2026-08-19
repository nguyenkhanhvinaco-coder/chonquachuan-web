export type Category = {
  label: string;
  icon: "briefcase" | "heart" | "person" | "digital" | "sparkle" | "gift";
  bg: string;
  fg: string;
};

export const categories: Category[] = [
  { label: "Quà đối tác", icon: "briefcase", bg: "var(--accent-soft)", fg: "oklch(0.45 0.14 40)" },
  { label: "Tri ân khách hàng", icon: "heart", bg: "var(--sage-soft)", fg: "oklch(0.4 0.1 150)" },
  { label: "Quà cá nhân", icon: "person", bg: "var(--surface-2)", fg: "var(--ink-soft)" },
  { label: "Quà số - Ebook", icon: "digital", bg: "var(--accent-soft)", fg: "oklch(0.45 0.14 40)" },
  { label: "Set handmade", icon: "sparkle", bg: "var(--sage-soft)", fg: "oklch(0.4 0.1 150)" },
  { label: "Theo dịp lễ", icon: "gift", bg: "var(--surface-2)", fg: "var(--ink-soft)" },
];
