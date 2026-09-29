import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Shoppit dashboard', description: 'Shoppit foundation dashboard' };
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
