import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#29C7CA',
          DEFAULT: '#29C7CA',
          dark: '#2BADAF',
          shadow: '#355657'
        },
        secondary: {
          light: '#111828',
          DEFAULT: '#111828',
          dark: '#51a6f5',
        },
        tertiary: {
          light: '#28A2CC',
          DEFAULT: '#28A2CC',
          dark: '#2187A9',
        },
        white: {
          light: '#FFFFFF',
          DEFAULT: '#FFFFFF',
          dark: '#FFFFFF',
        },
        background: {
          light: '#F9FAFB',
          DEFAULT: '#F9FAFB',
          dark: '#2D2E33',
        },
        text: {
          light: '#2D2E33',
          DEFAULT: '#1F2937',
          dark: '#FFFFFF',
        },
        success: {
          light: '#13CD89',
          DEFAULT: '#13CD89',
          dark: '#12B277',
        },
        error: {
          light: '#CD3B52',
          DEFAULT: '#CD3B52',
          dark: '#A02235',
        },
        button: {
          primary: '#29C7CA',
          secondary: '#3b82f6',
          primary_dark: '#29C7CA',
          secondary_dark: '#3b82f6',
          DEFAULT: '#28A2CC',
          on_button: '#FFFFFF',
          on_button_dark: '#FFFFFF',
          disable: '#EBEBE4'
        },
        field: {
          DEFAULT: '#111828',
          text: '#111828',
          text_dark: '#FFFFFF',
          border: '#111828',
          border_dark: '#51a6f5',
          ring: '#2BADAF',
          ring_dark: '#2BADAF',
          placeholder :'#808080',
          placeholder_dark :'#808080',
        }
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
} satisfies Config;
