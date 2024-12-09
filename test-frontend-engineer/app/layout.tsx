import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";
import { Header } from "./components/header";
import { Toaster } from "./components/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Stride ",
  description:
    "Modern essentials for the contemporary lifestyle. Shop premium clothing, bags, and accessories.",
  keywords: [
    "men's fashion",
    "laptop bags",
    "accessories",
    "premium clothing",
    "modern fashion",
    "lifestyle essentials",
    "contemporary style",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-screen antialiased`}
      >
        <Toaster />
        <Header />
        <Providers>{children}</Providers>
        <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
          <div className="container mx-auto px-4 py-6">
            <p className="text-center text-sm text-muted-foreground">
              © 2024 Store. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
