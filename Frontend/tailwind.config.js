/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './app/**/*.{ts,tsx,js,jsx}',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        md: "2rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        fiery: "#FF6A00",
        primary: {
          DEFAULT: "hsl(var(--primary))", // Fire orange as primary
          foreground: "hsl(var(--primary-foreground))",
          100: "#FFF0E6", // Very light orange
          200: "#FFDCC2", // Light orange
          300: "#FFC299", // Soft orange
          400: "#FFA366", // Muted orange
          500: "#FF6A00", // Main orange
          600: "#CC5500", // Darker orange
          700: "#994000", // Deep orange
          800: "#662A00", // Very dark orange
          900: "#331500", // Almost brown
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "fade-out": {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        "slide-in-from-top": {
          from: { transform: "translateY(-20px)", opacity: 0 },
          to: { transform: "translateY(0)", opacity: 1 },
        },
        "slide-in-from-bottom": {
          from: { transform: "translateY(20px)", opacity: 0 },
          to: { transform: "translateY(0)", opacity: 1 },
        },
        "slide-in-from-left": {
          from: { transform: "translateX(-20px)", opacity: 0 },
          to: { transform: "translateX(0)", opacity: 1 },
        },
        "slide-in-from-right": {
          from: { transform: "translateX(20px)", opacity: 0 },
          to: { transform: "translateX(0)", opacity: 1 },
        },
        "scale-in": {
          from: { transform: "scale(0.95)", opacity: 0 },
          to: { transform: "scale(1)", opacity: 1 },
        },
        "hover-glow": {
          "0%": { boxShadow: "0 0 0 rgba(255, 106, 0, 0)" },
          "100%": { boxShadow: "0 0 15px rgba(255, 106, 0, 0.6)" },
        },
        "pulse-gentle": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.8 },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "draw-line": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "flip-in": {
          "0%": { transform: "perspective(400px) rotateX(90deg)", opacity: 0 },
          "40%": { transform: "perspective(400px) rotateX(-10deg)" },
          "70%": { transform: "perspective(400px) rotateX(10deg)" },
          "100%": { transform: "perspective(400px) rotateX(0deg)", opacity: 1 },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "fade-out": "fade-out 0.5s ease-out forwards",
        "slide-in-from-top": "slide-in-from-top 0.5s ease-out forwards",
        "slide-in-from-bottom": "slide-in-from-bottom 0.5s ease-out forwards",
        "slide-in-from-left": "slide-in-from-left 0.5s ease-out forwards",
        "slide-in-from-right": "slide-in-from-right 0.5s ease-out forwards",
        "scale-in": "scale-in 0.5s ease-out forwards",
        "hover-glow": "hover-glow 0.3s ease-in-out forwards",
        "pulse-gentle": "pulse-gentle 2s infinite ease-in-out",
        "bounce-gentle": "bounce-gentle 2s infinite ease-in-out",
        "rotate-slow": "rotate-slow 8s linear infinite",
        "draw-line": "draw-line 1s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
        "flip-in": "flip-in 0.8s ease-out forwards",
        "shimmer": "shimmer 2s infinite linear"
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'var(--tw-prose-body)',
            a: {
              color: 'hsl(var(--primary))',
              '&:hover': {
                color: 'hsl(var(--primary))',
              },
            },
          },
        },
      },
      boxShadow: {
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 20px 40px -5px rgba(0, 0, 0, 0.15)',
        'button-glow': '0 0 15px rgba(255, 106, 0, 0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-dots': 'radial-gradient(circle, currentColor 1px, transparent 1px)',
        'shimmer': 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      gridTemplateColumns: {
        'fluid': 'repeat(auto-fit, minmax(18rem, 1fr))',
      },
      aspectRatio: {
        'portrait': '3/4',
        'landscape': '4/3',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
