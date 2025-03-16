'use client';
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { auth } from '@/lib/supabase';

export default function GirisPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailPrefix, setEmailPrefix] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePrefixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailPrefix(value);
    setEmail(value + '@pii.email');
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Lütfen e-posta ve şifrenizi girin.');
      return;
    }

    try {
      setLoading(true);
      const { data, error: signInError } = await auth.signIn(email, password);

      if (signInError) {
        throw signInError;
      }

      // Başarılı giriş sonrası ana sayfaya yönlendir
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Giriş hatası:', err);
      setError(err.message || 'Giriş sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
    }
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
          <Link href="/" className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm opacity-30 animate-pulse"></div>
              <Image 
                src="/images/logo.svg" 
                alt="Pii.Mail Logo" 
                width={28} 
                height={28} 
                className="relative z-10"
              />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Pii.Mail</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 relative z-10">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md bg-gray-900/50 backdrop-blur-md p-8 rounded-xl border border-gray-800 shadow-xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white via-blue-100 to-white text-transparent bg-clip-text">Giriş Yap</h1>
            <p className="text-gray-400">Pii.Mail hesabınıza giriş yapın</p>
          </div>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg p-4 mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">E-posta</label>
              <div className="flex items-center w-full bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                <input
                  id="emailPrefix"
                  type="text"
                  value={emailPrefix}
                  onChange={handlePrefixChange}
                  placeholder="ad"
                  className="flex-1 px-4 py-3 bg-transparent border-0 text-white placeholder-gray-500 focus:outline-none"
                  required
                />
                <div className="bg-gray-700/50 px-3 py-3 text-gray-300 font-medium flex items-center">
                  @pii.email
                </div>
              </div>
              <input type="hidden" name="email" value={email} />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">Şifre</label>
                <Link href="/sifremi-unuttum" className="text-sm text-blue-400 hover:text-blue-300">Şifremi Unuttum</Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">Beni hatırla</label>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-lg text-white font-medium transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 flex items-center justify-center"
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Hesabınız yok mu? <Link href="/kayit-ol" className="text-blue-400 hover:text-blue-300">Kayıt Ol</Link>
            </p>
          </div>
        </motion.div>
      </main>

      {/* Simple Footer */}
      <div className="relative z-10 py-4 text-xs text-gray-500 border-t border-gray-800/50 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>© 2025 Pii.Mail Inc. — tüm hakları saklıdır.</div>
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