import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";

import { MobileProvider } from "@/components/providers/mobile-context";
import { getSiteUrl } from "@/lib/site-url";

import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Praxis",
  description:
    "Praxis is the first prediction market where users trade outcomes with yield, not principal.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistMono.variable} h-full font-sans antialiased`} suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-css-tags -- Helvetica @font-face in public/fonts; link keeps relative url() working */}
        <link rel="stylesheet" href="/fonts/stylesheet.css" />
        <link
          rel="preload"
          href="/fonts/HelveticaNowDisplay-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <MobileProvider>{children}</MobileProvider>
      </body>
    </html>
  );
}
