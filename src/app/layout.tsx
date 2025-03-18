import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AnimatePresence } from "framer-motion";
import { DefaultSeo } from "next-seo";
import defaultSEOConfig from "@/lib/seo.config";
import "./globals.css";

// Geist fontunu import ediyorum (ekran görüntüsündeki yönteme göre)
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

// Inter fontunu da koruyoruz
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Pii.Mail",
    default: "Pii.Mail — Gizlilik, Hız, Güven",
  },
  description: "Modern, güvenli ve kullanıcı dostu e-posta deneyimi. Gizliliğinizi ve güvenliğinizi ön planda tutan açık kaynaklı e-posta çözümü.",
  keywords: "e-posta, email, güvenli email, gizlilik, uçtan uca şifreleme, encrypted email, pii.email",
  authors: [{ name: "Pii.Mail Ekibi" }],
  creator: "Pii.Mail",
  publisher: "Pii.Mail",
  alternates: {
    canonical: "https://pii.email",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Pii.Mail — Gizlilik, Hız, Güven",
    description: "Modern, güvenli ve kullanıcı dostu e-posta deneyimi. Gizliliğinizi ve güvenliğinizi ön planda tutan açık kaynaklı e-posta çözümü.",
    url: "https://pii.email",
    siteName: "Pii.Mail",
    images: [
      {
        url: "https://pii.email/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Pii.Mail",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pii.Mail — Gizlilik, Hız, Güven",
    description: "Modern, güvenli ve kullanıcı dostu e-posta deneyimi. Gizliliğinizi ve güvenliğinizi ön planda tutan açık kaynaklı e-posta çözümü.",
    images: ["https://pii.email/images/og-image.svg"],
    creator: "@piimail",
    site: "@piimail",
  },
  metadataBase: new URL("https://pii.email"),
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/icon-192x192.svg', type: 'image/svg+xml', sizes: '192x192' },
      { url: '/images/icon-512x512.svg', type: 'image/svg+xml', sizes: '512x512' },
    ],
    apple: [
      { url: '/images/icon-192x192.svg', type: 'image/svg+xml', sizes: '192x192' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/images/icon-192x192.svg',
      },
    ],
  },
  manifest: '/site.webmanifest',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
  appleWebApp: {
    capable: true,
    title: "Pii.Mail",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <DefaultSeo {...defaultSEOConfig} />
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${inter.variable} antialiased`}
      >
        <AnimatePresence>
          {children}
        </AnimatePresence>
      </body>
    </html>
  );
}
