import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  title: 'Aave vs Banks Dashboard',
  description: 'Dynamic dashboard comparing Aave protocol with top U.S. banks by deposit size',
  keywords: 'Aave, DeFi, banks, deposits, dashboard, cryptocurrency, protocol',
  authors: [{ name: 'Aave vs Banks Dashboard' }],
  openGraph: {
    title: 'Aave vs Banks Dashboard',
    description: 'Aave ranks among top U.S. banks by deposit size',
    type: 'website',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aave vs Banks Dashboard',
    description: 'Aave ranks among top U.S. banks by deposit size',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
