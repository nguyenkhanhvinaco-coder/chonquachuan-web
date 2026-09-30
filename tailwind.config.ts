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
        // 2026-09-30 chi Nga chon Aptos cho ca website. Aptos la font cua Microsoft, KHONG duoc
        // nhung file font len web — chi goi theo ten: may co san Aptos (Windows/Office moi) thi
        // hien Aptos, may khac (dien thoai, Mac) tu roi ve Lora / Be Vietnam Pro nhu truoc.
        serif: ["Aptos Display", "Aptos", "var(--font-lora)", "Georgia", "serif"],
        sans: ["Aptos", "var(--font-be-vietnam)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
