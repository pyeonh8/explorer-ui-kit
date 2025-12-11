// tailwind.config.ts (v4 최소 설정)
import type { Config } from 'tailwindcss';

const config: Config = {
  // Tailwind가 유틸리티를 스캔할 파일 경로를 정의합니다 (필수!)
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  // 테마는 CSS 파일에서 정의하므로 비워둡니다.
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
