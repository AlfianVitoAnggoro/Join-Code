'use client';
import { Inter } from 'next/font/google';
import NavbarTop from './navbar_top';
import NavbarBottom from './navbar_bottom';
import Footer from './footer';
import { SessionProvider } from '../../node_modules/next-auth/react';
const inter = Inter({ subsets: ['latin'] });
import './globals.css';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const disableNavbar = ['/dashboard'];
  disableNavbar.push(...['/dashboard.*']);
  const regexRoutes = disableNavbar.map(route => new RegExp(`^${route}$`));
  const shouldDisableNavbar = pathname => {
    return regexRoutes.some(regex => regex.test(pathname));
  };
  const pathname = usePathname();
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${
          !shouldDisableNavbar(pathname) &&
          'bg-mainColor absolute laptop:w-full'
        } `}
      >
        <SessionProvider>
          {!shouldDisableNavbar(pathname) && <NavbarTop />}
          {children}
          {!shouldDisableNavbar(pathname) && <Footer />}
          {!shouldDisableNavbar(pathname) && <NavbarBottom />}
        </SessionProvider>
      </body>
    </html>
  );
}
