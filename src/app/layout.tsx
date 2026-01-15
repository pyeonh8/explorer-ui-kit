import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const mainFontR = localFont({
  src: '../fonts/HakgyoansimDunggeunmisoTTF-R.woff2',
  variable: '--font-mainFontR',
  weight: '400',
});

const mainFontB = localFont({
  src: '../fonts/HakgyoansimDunggeunmisoTTF-B.woff2',
  variable: '--font-mainFontB',
  weight: '700',
});

export const metadata: Metadata = {
  title: '탐험해요 뽀모도로 타이머',
  description: '동물의 숲 뽀모도로 타이머, 주민들과 함께 떠나는 집중 모험! ',

  keywords: [
    '동물의 숲',
    '뽀모도로',
    '타이머',
    '집중',
    'Animal Crossing',
    'Pomodoro timer',
    'Pomodoro',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${mainFontB.variable} ${mainFontR.variable}`}>
        {children}
      </body>
    </html>
  );
}
