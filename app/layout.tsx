import Providers from "@/utils/provider";
import React from "react";
import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { ModeToggle } from "@/components/mode-toggle";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import AuthStatus from "@/components/auth-status";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Person Bitacora",
  description: "Generated by create next app",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <>
          <Providers>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Toaster />
              <Suspense fallback="Loading...">
                {/* @ts-expect-error Async Server Component */}
                <AuthStatus />
              </Suspense>
              <header>
                <div className="flex items-center justify-between">
                  <ModeToggle />
                  <div className="flex items-center flex-shrink-0 mr-6">
                    <svg
                      className="fill-current h-8 w-8 mr-2"
                      width="54"
                      height="54"
                      viewBox="0 0 54 54"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
                    </svg>
                    <span className="font-semibold text-xl tracking-tight">
                      Person Bitacora
                    </span>
                  </div>
                  <div className="block sm:hidden">
                    <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                      <svg
                        className="fill-current h-3 w-3"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                      </svg>
                    </button>
                  </div>
                  <nav className="ml-auto text-sm font-medium space-x-6">
                    <Link href="/">Home</Link>
                    <Link href="/table3/">Table3</Link>
                    <Link href="/table2/">Table2</Link>
                    <Link href="/table/">Table</Link>
                    <Link href="/table1/">Table1</Link>
                    <Link href="/bitacora/">List</Link>
                    <Link href="/about">About</Link>
                    <Link href="/protected">Login</Link>
                  </nav>
                </div>
              </header>

              <main>{children}</main>
              <Analytics />
            </ThemeProvider>
          </Providers>
        </>
      </body>
    </html>
  );
}
