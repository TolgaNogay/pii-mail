'use client';

import { Organization, WebSite, WithContext } from 'schema-dts';

export function OrganizationSchema() {
  const organizationData: WithContext<Organization> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PiMail',
    url: 'https://pii.email',
    logo: 'https://pii.email/images/logo.png',
    sameAs: [
      'https://twitter.com/pimailapp',
      'https://github.com/pimail',
      'https://linkedin.com/company/pimail'
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        email: 'info@pii.email',
        contactType: 'customer service',
        availableLanguage: ['Turkish', 'English']
      }
    ],
    slogan: 'Gizlilik, hız, güven.',
    description: 'Modern, güvenli ve kullanıcı dostu e-posta deneyimi. Gizliliğinizi ve güvenliğinizi ön planda tutan açık kaynaklı e-posta çözümü.'
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
    />
  );
}

export function WebsiteSchema() {
  const websiteData: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PiMail',
    url: 'https://pii.email',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://pii.email/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    } as any // Using type assertion to bypass strict typing for non-standard schema properties
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
    />
  );
}

export default function StructuredData() {
  return (
    <>
      <OrganizationSchema />
      <WebsiteSchema />
    </>
  );
} 