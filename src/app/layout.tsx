import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../../styles/main.scss';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  adjustFontFallback: false,
  style: ['normal'],
});

export const metadata: Metadata = {
  title: 'Tomu',
  description:
    'Unified wallet with support for offramping/onramping operations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>{children}</body>
    </html>
  );
}
