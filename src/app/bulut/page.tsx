'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import CompactFooter from "@/components/ui/CompactFooter";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // Simüle edilmiş giriş kontrolü - gerçek uygulamada bir API isteği yapılacak
    setTimeout(() => {
      // Demo için basit doğrulama
      if (email && password) {
        setShowTwoFactor(true);
        setIsLoading(false);
      } else {
        setError("Lütfen e-posta ve şifrenizi girin.");
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleTwoFactorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // Simüle edilmiş 2FA doğrulama - gerçek uygulamada bir API isteği yapılacak
    setTimeout(() => {
      if (twoFactorCode) {
        // Başarılı 2FA doğrulama - yönetici paneline yönlendir
        window.location.href = "/yonetici"; // Veya Next.js router kullanılabilir
      } else {
        setError("Lütfen geçerli bir doğrulama kodu girin.");
        setIsLoading(false);
      }
    }, 1000);
  };

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
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm opacity-30 animate-pulse"></div>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white relative z-10">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <Link href="/" className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Pii.Mail
            </Link>
          </div>
          <Link 
            href="/" 
            className="px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-all text-sm hover:border-white/40"
          >
            Ana Sayfa
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12 z-10 relative flex items-center justify-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg p-8 rounded-2xl border border-gray-700/50 shadow-xl">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Yönetici Girişi</h2>
              <p className="text-gray-400 mt-2">Lütfen yönetici kimlik bilgilerinizle giriş yapın</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}

            {!showTwoFactor ? (
              <form onSubmit={handleEmailPasswordSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    E-posta
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="admin@pii.email"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                    Şifre
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••••"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all text-white font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Giriş Yapılıyor
                    </span>
                  ) : (
                    "Devam Et"
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleTwoFactorSubmit}>
                <div className="mb-6">
                  <label htmlFor="twoFactorCode" className="block text-sm font-medium text-gray-300 mb-1">
                    İki Adımlı Doğrulama Kodu
                  </label>
                  <input
                    id="twoFactorCode"
                    type="text"
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center tracking-widest"
                    placeholder="000000"
                    maxLength={6}
                    required
                  />
                  <p className="mt-2 text-sm text-gray-400">
                    Kimlik doğrulama uygulamanızdan 6 haneli kodu girin
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all text-white font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Doğrulanıyor
                    </span>
                  ) : (
                    "Giriş Yap"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowTwoFactor(false)}
                  className="w-full mt-3 px-4 py-2 rounded-lg border border-gray-700 hover:border-gray-600 hover:bg-gray-800/50 transition-all text-gray-300 text-sm"
                >
                  Geri Dön
                </button>
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-gray-800">
              <p className="text-sm text-gray-400 text-center">
                Güvenlik sorunları için{" "}
                <Link href="/iletisim" className="text-blue-400 hover:text-blue-300">
                  destek ekibimizle iletişime geçin
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      <CompactFooter />
    </motion.div>
  );
} 