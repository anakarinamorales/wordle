import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Wordle',
  description: 'Test assessment for front-end engineer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        {children}
      </body>
    </html>
  );
}
