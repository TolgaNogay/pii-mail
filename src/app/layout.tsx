import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import { AnimatePresence } from "framer-motion";
import StructuredData from "@/components/ui/structured-data";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "pii.email — gizlilik, hız, güven.",
  description: "Modern, güvenli ve kullanıcı dostu e-posta deneyimi. Gizliliğinizi ve güvenliğinizi ön planda tutan açık kaynaklı e-posta çözümü.",
  keywords: "e-posta, email, güvenli email, gizlilik odaklı, hızlı email, açık kaynak, encrypted email, pimail",
  authors: [{ name: "PiMail Team" }],
  category: "Technology",
  openGraph: {
    title: "pii.email — gizlilik, hız, güven.",
    description: "Modern, güvenli ve kullanıcı dostu e-posta deneyimi. Gizliliğinizi ve güvenliğinizi ön planda tutan açık kaynaklı e-posta çözümü.",
    url: "https://pii.email",
    siteName: "PiMail",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PiMail - Modern Email Experience",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "pii.email — gizlilik, hız, güven.",
    description: "Modern, güvenli ve kullanıcı dostu e-posta deneyimi. Gizliliğinizi ve güvenliğinizi ön planda tutan açık kaynaklı e-posta çözümü.",
    images: ["/images/twitter-image.jpg"],
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
  verification: {
    google: "google-site-verification-code",
  },
  alternates: {
    canonical: "https://pii.email",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <StructuredData />
        <AnimatePresence>
          <main className="relative">
            {children}
          </main>
        </AnimatePresence>
        <Analytics />
        <SpeedInsights />
        
        {/* Google Analytics Script */}
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </body>
    </html>
  );
}
