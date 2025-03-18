"use client";

import Link from "next/link";

export function CompactFooter() {
  return (
    <footer className="w-full bg-[#020817] text-white py-3 border-t border-gray-800/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm font-medium">PiMail</span>
            <span className="text-xs text-gray-500">© {new Date().getFullYear()} PiMail Inc. — tüm hakları saklıdır.</span>
          </div>

          <nav className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/hakkimizda" className="hover:text-white transition-colors">Hakkımızda</Link>
            <Link href="/ozellikler" className="hover:text-white transition-colors">Özellikler</Link>
            <Link href="/fiyatlandirma" className="hover:text-white transition-colors">Fiyatlandırma</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/iletisim" className="hover:text-white transition-colors">İletişim</Link>
            <Link href="/gizlilik" className="hover:text-white transition-colors">Gizlilik</Link>
            <Link href="/kullanim-sartlari" className="hover:text-white transition-colors">Kullanım Şartları</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default CompactFooter; 