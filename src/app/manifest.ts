import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PiMail - Modern E-posta Deneyimi',
    short_name: 'PiMail',
    description: 'Modern, güvenli ve kullanıcı dostu e-posta deneyimi. Gizliliğinizi ve güvenliğinizi ön planda tutan açık kaynaklı e-posta çözümü.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/icon-192x192-maskable.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512x512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    orientation: 'portrait',
    lang: 'tr-TR',
    dir: 'ltr',
    prefer_related_applications: false,
    screenshots: [
      {
        src: '/screenshots/desktop-1.jpg',
        sizes: '1920x1080',
        type: 'image/jpeg',
        form_factor: 'wide',
      },
      {
        src: '/screenshots/mobile-1.jpg',
        sizes: '750x1334',
        type: 'image/jpeg',
        form_factor: 'narrow',
      },
    ],
    categories: ['email', 'productivity', 'communication'],
  };
} 