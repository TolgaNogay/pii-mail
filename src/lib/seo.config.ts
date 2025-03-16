import { DefaultSeoProps } from 'next-seo';

// Site URL'si
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pii.email';

// Varsayılan SEO yapılandırması
const defaultSEOConfig: DefaultSeoProps = {
  titleTemplate: '%s | Pii.Mail',
  defaultTitle: 'Pii.Mail — Gizlilik, Hız, Güven',
  description: 'Modern, güvenli ve kullanıcı dostu e-posta deneyimi. Gizliliğinizi ve güvenliğinizi ön planda tutan açık kaynaklı e-posta çözümü.',
  canonical: siteUrl,
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: siteUrl,
    siteName: 'Pii.Mail',
    title: 'Pii.Mail — Gizlilik, Hız, Güven',
    description: 'Modern, güvenli ve kullanıcı dostu e-posta deneyimi. Gizliliğinizi ve güvenliğinizi ön planda tutan açık kaynaklı e-posta çözümü.',
    images: [
      {
        url: `${siteUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Pii.Mail',
      },
    ],
  },
  twitter: {
    handle: '@piimail',
    site: '@piimail',
    cardType: 'summary_large_image',
  },
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
  additionalMetaTags: [
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent',
    },
  ],
};

export default defaultSEOConfig; 