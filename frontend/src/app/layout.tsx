import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SkyWings - Fast & Modern Flight Search App',
  description: 'Search and book flights worldwide powered by Next.js TypeScript & Java Spring Boot API',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
