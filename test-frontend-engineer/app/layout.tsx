import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Button } from './components/button'
import { ShoppingBasketIcon } from 'lucide-react'
import Link from 'next/link'
import Providers from './providers'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Stride ',
  description:
    'Modern essentials for the contemporary lifestyle. Shop premium clothing, bags, and accessories.',
  //   url: '', // TODO: Add url
  // ogImage: '', // TODO: Add ogImage
  keywords: [
    "men's fashion",
    'laptop bags',
    'accessories',
    'premium clothing',
    'modern fashion',
    'lifestyle essentials',
    'contemporary style',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-screen antialiased`}
      >
        <header className="flex h-16 w-full items-center justify-center border-b-[1px] border-secondary">
          <div className="mx-8 flex w-full items-center justify-between">
            <Link href="/">
              <div className="flex space-x-4">
                <img src="/stride-logo.svg" alt="Stride" className="h-8" />
                <h1 className="text-2xl font-bold">Stride</h1>
              </div>
            </Link>
            <Button variant="outline">
              <ShoppingBasketIcon />
            </Button>
          </div>
        </header>
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
  )
}
