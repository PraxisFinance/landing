import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";

import { MobileProvider } from "@/components/providers/mobile-context";
import { getSiteUrl } from "@/lib/site-url";

import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteTitle = "Praxis Predictions";
const siteDescription =
  "Praxis is the first prediction market where users trade outcomes with yield, not principal.";
const previewImage = {
  path: "/preview-v2.png",
  width: 1200,
  height: 630,
  alt: "Praxis — prediction market with yield",
} as const;

function getPreviewImageUrl(): string {
  return new URL(previewImage.path, getSiteUrl()).href;
}

function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteTitle,
    description: siteDescription,
    url: getSiteUrl(),
    image: {
      "@type": "ImageObject",
      url: getPreviewImageUrl(),
      width: previewImage.width,
      height: previewImage.height,
    },
  };
}

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: siteTitle,
  description: siteDescription,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    images: [
      {
        url: previewImage.path,
        width: previewImage.width,
        height: previewImage.height,
        alt: previewImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [previewImage.path],
  },
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
    <html
      lang="en"
      className={`${geistMono.variable} h-full font-sans antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebSiteJsonLd()),
          }}
        />
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
