import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(210 30% 10%)",
        surface: "hsl(210 30% 12%)",
        card: "rgba(255, 255, 255, 0.06)",
        primary: "hsl(32 95% 62%)",
        accent: "rgba(255, 169, 64, 0.15)",
        "accent-soft": "rgba(255, 169, 64, 0.4)",
        "accent-foreground": "hsl(32 98% 30%)",
        border: "rgba(255,255,255,0.1)",
        muted: "rgba(255,255,255,0.68)"
      }
    }
  },
  plugins: []
};

export default config;
