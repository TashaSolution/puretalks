import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.75rem",
        lg: "2.5rem",
        xl: "3rem",
        "2xl": "3.5rem",
      },
      screens: {
        "2xl": "1380px",
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ivory: {
          DEFAULT: "#FAF8F5",
          warm: "#FDFBF7",
          subtle: "#F5EFEB",
        },
        champagne: {
          DEFAULT: "#F4EFEA",
          light: "#FBF8F4",
          dark: "#E8DFC5",
          border: "rgba(197, 168, 105, 0.25)",
        },
        sage: {
          DEFAULT: "#4A6B5D",
          light: "#6A8C7E",
          dark: "#354E43",
          subtle: "rgba(74, 107, 93, 0.08)",
          glow: "rgba(74, 107, 93, 0.18)",
        },
        charcoal: {
          DEFAULT: "#1C2024",
          light: "#2D3339",
          muted: "#4B5563",
          subtle: "#6B7280",
        },
        gold: {
          DEFAULT: "#C5A869",
          light: "#DFC896",
          dark: "#997E3B",
          subtle: "rgba(197, 168, 105, 0.12)",
          border: "rgba(197, 168, 105, 0.3)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          subtle: "var(--surface-subtle)",
          elevated: "var(--surface-elevated)",
          glass: "var(--surface-glass)",
        },
        primary: {
          DEFAULT: "#4A6B5D",
          hover: "#3B5749",
          subtle: "rgba(74, 107, 93, 0.08)",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#C5A869",
          hover: "#B89748",
          subtle: "rgba(197, 168, 105, 0.12)",
          foreground: "#1C2024",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1C2024",
          border: "rgba(28, 32, 36, 0.07)",
        },
        border: "var(--border)",
        "border-glow": "var(--border-glow)",
        muted: {
          DEFAULT: "#6B7280",
          foreground: "#9CA3AF",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        tamil: ["var(--font-tamil)", "Noto Sans Tamil", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(28, 32, 36, 0.04)",
        card: "0 10px 30px -5px rgba(28, 32, 36, 0.05), 0 2px 8px -2px rgba(28, 32, 36, 0.02)",
        "card-hover": "0 20px 45px -10px rgba(74, 107, 93, 0.12), 0 4px 12px rgba(0, 0, 0, 0.03)",
        "glow-sage": "0 0 28px -4px rgba(74, 107, 93, 0.25)",
        "glow-gold": "0 0 28px -4px rgba(197, 168, 105, 0.25)",
        glass: "0 8px 32px 0 rgba(28, 32, 36, 0.04)",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-delayed": "float 9s ease-in-out 2s infinite",
        "pulse-subtle": "pulseSubtle 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
