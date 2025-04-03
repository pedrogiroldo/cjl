import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
      },
    },
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        ":root": {
          "--scrollbar-thumb": theme("colors.gray.500"),
          "--scrollbar-thumb-hover": theme("colors.gray.600"),
        },
        html: {
          scrollbarWidth: "thin",
          scrollbarColor: "var(--scrollbar-thumb) transparent",
        },
        "body::-webkit-scrollbar, *::-webkit-scrollbar": {
          width: "6px",
          height: "6px",
        },
        "body::-webkit-scrollbar-track, *::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "body::-webkit-scrollbar-thumb, *::-webkit-scrollbar-thumb": {
          backgroundColor: "var(--scrollbar-thumb)",
          borderRadius: "3px",
        },
        "body::-webkit-scrollbar-thumb:hover, *::-webkit-scrollbar-thumb:hover":
          {
            backgroundColor: "var(--scrollbar-thumb-hover)",
          },
      });
    }),
  ],
} satisfies Config;
