'use client';
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // 3 saniye sonra ana sayfaya yönlendir
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000);

    // Geri sayım için interval
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Component unmount olduğunda timer'ı temizle
    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [router]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white font-[family-name:var(--font-geist-sans)] flex flex-col relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 left-1/2 transform -translate-x-1/2 w-full h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="p-4 relative z-10 backdrop-blur-sm bg-black/20">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm opacity-30 animate-pulse"></div>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white relative z-10">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">PiMail</span>
          </Link>
          <div className="flex gap-3">
            <Link 
              href="/giris" 
              className="px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-all text-sm hover:border-white/40"
            >
              Giriş Yap
            </Link>
            <Link 
              href="/kayit-ol" 
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all text-sm shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
            >
              Kayıt Ol
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center relative z-10 py-12 px-4">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center max-w-2xl"
        >
          <div className="mb-8">
            <div className="text-[150px] font-bold leading-none bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 text-transparent bg-clip-text">404</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Sayfa Bulunamadı</h1>
            <p className="text-gray-400 text-lg mb-2">
              Aradığınız sayfa mevcut değil veya taşınmış olabilir.
            </p>
            <p className="text-blue-400 text-lg font-medium animate-pulse">
              {countdown} saniye içinde ana sayfaya yönlendiriliyorsunuz...
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link 
              href="/" 
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-lg text-white font-medium transition-colors shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
            >
              Ana Sayfaya Dön
            </Link>
            <Link 
              href="/yardim" 
              className="px-6 py-3 bg-gray-800/70 hover:bg-gray-700/70 rounded-lg text-white font-medium transition-colors"
            >
              Yardım Sayfası
            </Link>
          </div>
          
          <div className="mt-12 bg-gray-900/50 backdrop-blur-md p-6 rounded-xl border border-gray-800 shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-blue-300">Popüler Sayfalar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Link href="/hakkimizda" className="p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-colors text-left">
                <div className="font-medium text-white">Hakkımızda</div>
                <div className="text-sm text-gray-400">PiMail'in hikayesi ve vizyonu</div>
              </Link>
              <Link href="/ozellikler" className="p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-colors text-left">
                <div className="font-medium text-white">Özellikler</div>
                <div className="text-sm text-gray-400">PiMail'in sunduğu özellikler</div>
              </Link>
              <Link href="/iletisim" className="p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-colors text-left">
                <div className="font-medium text-white">İletişim</div>
                <div className="text-sm text-gray-400">Bizimle iletişime geçin</div>
              </Link>
              <Link href="/kayit-ol" className="p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-colors text-left">
                <div className="font-medium text-white">Kayıt Ol</div>
                <div className="text-sm text-gray-400">Hemen ücretsiz hesap oluşturun</div>
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Simple Footer */}
      <div className="relative z-10 py-4 text-xs text-gray-500 border-t border-gray-800/50 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>© 2025 PiMail Inc. — tüm hakları saklıdır.</div>
          <div className="flex space-x-4">
            <Link href="/kullanim-kosullari" className="text-gray-400 hover:text-white transition-colors">Kullanım Koşulları</Link>
            <Link href="/gizlilik" className="text-gray-400 hover:text-white transition-colors">Gizlilik ve Tanımlama Bilgileri</Link>
            <Link href="/yardim" className="text-gray-400 hover:text-white transition-colors">Yardım</Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 