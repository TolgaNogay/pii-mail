"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// Navigation yapısı
const navigation = {
  categories: [
    {
      id: "pimail",
      name: "PiMail",
      sections: [
        {
          id: "about",
          name: "Hakkımızda",
          items: [
            { name: "Hakkımızda", href: "/hakkimizda" },
            { name: "Ekibimiz", href: "/ekibimiz" },
            { name: "Kariyer", href: "/kariyer" },
          ],
        },
        {
          id: "features",
          name: "Özellikler",
          items: [
            { name: "Özellikler", href: "/ozellikler" },
            { name: "Güvenlik", href: "/guvenlik" },
            { name: "Gizlilik", href: "/gizlilik" },
          ],
        },
        {
          id: "products",
          name: "Ürünler",
          items: [
            { name: "PiMail Bulut", href: "/bulut" },
            { name: "PiMail Pro", href: "/pimail-pro" },
            { name: "PiMail Business", href: "/pimail-business" },
            { name: "PiMail API", href: "/pimail-api" },
          ],
        },
        {
          id: "resources",
          name: "Kaynaklar",
          items: [
            { name: "Blog", href: "/blog" },
            { name: "Destek", href: "/destek" },
            { name: "Dokümantasyon", href: "/dokumanlar" },
          ],
        },
        {
          id: "legal",
          name: "Yasal",
          items: [
            { name: "Kullanım Şartları", href: "/kullanim-sartlari" },
            { name: "Gizlilik Politikası", href: "/gizlilik" },
            { name: "Çerez Politikası", href: "/cerez-politikasi" },
          ],
        },
        {
          id: "contact",
          name: "İletişim",
          items: [
            { name: "İletişim", href: "/iletisim" },
            { name: "Destek", href: "/destek" },
            { name: "Bize Ulaşın", href: "/iletisim" },
          ],
        },
      ],
    },
  ],
};

// Sosyal medya ikonları için stil
const SocialIconStyle = `hover:-translate-y-1 border border-blue-500/30 rounded-xl p-2.5 transition-transform bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white`;

// Tema değiştirme bileşeni
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Sayfa yüklendiğinde mevcut tema durumunu kontrol et
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button 
      onClick={toggleTheme}
      className={`${SocialIconStyle} flex items-center justify-center`}
      aria-label="Tema Değiştir"
    >
      {isDark ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      )}
    </button>
  );
};

export function Footer() {
  return (
    <footer className="border-t border-gray-800/50 w-full bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="relative mx-auto grid max-w-7xl items-center justify-center gap-6 p-10 pb-0 md:flex">
        <Link href="/">
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm opacity-30 animate-pulse"></div>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white relative z-10">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text ml-2">Pii.Mail</span>
          </div>
        </Link>
        <p className="bg-transparent text-center text-xs leading-relaxed text-gray-400 md:text-left">
          PiMail ile e-postayı istediğiniz şekilde deneyimleyin — gizliliğinizi ve güvenliğinizi ön planda tutan ilk açık kaynaklı e-posta uygulaması. Modern, güvenli ve kullanıcı dostu e-posta deneyimi sunan PiMail, verilerinizin kontrolünü size bırakır. Uçtan uca şifreleme, hızlı arayüz ve karanlık tema gibi özelliklerle e-posta deneyiminizi dönüştürün.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="border-b border-gray-800/50"></div>
        <div className="py-10">
          {navigation.categories.map((category) => (
            <div
              key={category.name}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 leading-6"
            >
              {category.sections.map((section) => (
                <div key={section.name} className="mb-6 md:mb-0">
                  <h3 className="text-sm font-semibold text-white mb-3">{section.name}</h3>
                  <ul
                    role="list"
                    aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                    className="flex flex-col space-y-2"
                  >
                    {section.items.map((item) => (
                      <li key={item.name} className="flow-root">
                        <Link
                          href={item.href}
                          className="text-sm text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-flex items-center gap-1 group"
                        >
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span> {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="border-b border-gray-800/50"></div>
      </div>

      <div className="flex flex-wrap justify-center gap-y-6">
        <div className="flex flex-wrap items-center justify-center gap-6 gap-y-4 px-6">
          <Link
            aria-label="Email"
            href="mailto:iletisim@pii.email"
            rel="noreferrer"
            target="_blank"
            className={SocialIconStyle}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </Link>
          <Link
            aria-label="Twitter"
            href="https://twitter.com/pimailapp"
            rel="noreferrer"
            target="_blank"
            className={SocialIconStyle}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          </Link>
          <Link
            aria-label="GitHub"
            href="https://github.com/pimail"
            rel="noreferrer"
            target="_blank"
            className={SocialIconStyle}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </Link>
          <Link
            aria-label="LinkedIn"
            href="https://www.linkedin.com/company/pimail"
            rel="noreferrer"
            target="_blank"
            className={SocialIconStyle}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </Link>
        </div>
      </div>

      <div className="mx-auto mb-10 mt-10 flex flex-col justify-between text-center text-xs md:max-w-7xl">
        <div className="flex flex-row items-center justify-center gap-1 text-gray-500">
          <span>©</span>
          <span>{new Date().getFullYear()}</span>
          <span>Pii.Mail Inc. — tüm hakları saklıdır.</span>
          <span className="mx-1">|</span>
          <span className="inline-flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 1200 800">
              {/* Arka plan (Kırmızı) */}
              <rect width="1200" height="800" fill="#E30A17"/>
              
              {/* Ay (Beyaz) */}
              <circle cx="500" cy="400" r="200" fill="white"/>
              <circle cx="570" cy="400" r="160" fill="#E30A17"/>
              
              {/* Yıldız (Beyaz) */}
              <polygon fill="white" points="635,400 676,484 768,484 693,538 724,624 635,570 546,624 577,538 502,484 594,484"/>
            </svg>
            Türkiye'de üretildi
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 