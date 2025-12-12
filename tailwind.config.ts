import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        default: ['var(--font-mainFontR)', 'sans-serif'],
      },
      fontWeight: {
        bold: ['700', 'var(--font-mainFontB)'],
      },
    },
  },
  plugins: [],
};
export default config;
