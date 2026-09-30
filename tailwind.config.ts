import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        line: "var(--line)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-ink)",
        "accent-soft": "var(--accent-soft)",
        sage: "var(--sage)",
        "sage-soft": "var(--sage-soft)",
      },
      fontFamily: {
        // Bo font giong happynuts.vn (2026-09-30): "serif" = tieu de, "sans" = chu thuong.
        // Ten khoa giu nguyen serif/sans de khong phai sua class font-serif khap cac trang.
        serif: ["var(--font-tieu-de)", "Arial Narrow", "sans-serif"],
        sans: ["var(--font-chu-thuong)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
