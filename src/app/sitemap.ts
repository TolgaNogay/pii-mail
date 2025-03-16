import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pii.email';
  
  // Statik sayfalar
  const staticPages = [
    '',
    '/giris',
    '/kayit-ol',
    '/sifremi-unuttum',
    '/iletisim',
    '/hakkimizda',
    '/gizlilik',
    '/kullanim-kosullari',
    '/yardim',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...staticPages];
} 