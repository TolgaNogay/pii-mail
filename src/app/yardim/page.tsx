'use client';
import Link from "next/link";
import { motion } from "framer-motion";

export default function YardimPage() {
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
      <main className="flex-1 relative z-10 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-900/50 backdrop-blur-md p-8 rounded-xl border border-gray-800 shadow-xl"
          >
            <div className="prose prose-invert max-w-none">
              <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white text-transparent bg-clip-text">Yardım Merkezi</h1>
              
              <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">Sık Sorulan Sorular</h2>
                
                <div className="space-y-6">
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-medium mb-2 text-blue-200">PiMail nedir?</h3>
                    <p className="text-gray-300">
                      PiMail, gizlilik odaklı, güvenli ve kullanıcı dostu bir e-posta hizmetidir. Kişisel verilerinizi korurken modern ve hızlı bir e-posta deneyimi sunmayı amaçlıyoruz.
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-medium mb-2 text-blue-200">PiMail'i nasıl kullanabilirim?</h3>
                    <p className="text-gray-300">
                      PiMail'i kullanmak için öncelikle bir hesap oluşturmanız gerekiyor. Kayıt olduktan sonra, e-postalarınızı gönderip alabilir, klasörler oluşturabilir ve tüm e-posta işlemlerinizi güvenli bir şekilde gerçekleştirebilirsiniz.
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-medium mb-2 text-blue-200">PiMail ücretsiz mi?</h3>
                    <p className="text-gray-300">
                      Evet, PiMail'in temel özellikleri ücretsizdir. Daha fazla depolama alanı ve gelişmiş özellikler için premium planlarımız da bulunmaktadır.
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-medium mb-2 text-blue-200">Şifremi unuttum, ne yapmalıyım?</h3>
                    <p className="text-gray-300">
                      Şifrenizi unuttuysanız, giriş sayfasındaki "Şifremi Unuttum" bağlantısını kullanabilirsiniz. Size kurtarma e-postası göndereceğiz veya alternatif kurtarma yöntemlerini kullanabilirsiniz.
                    </p>
                  </div>
                  
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-medium mb-2 text-blue-200">PiMail'de verilerim güvende mi?</h3>
                    <p className="text-gray-300">
                      Evet, PiMail'de güvenlik ve gizlilik önceliğimizdir. Uçtan uca şifreleme, güçlü parola politikaları ve gelişmiş güvenlik önlemleri ile verilerinizi koruyoruz.
                    </p>
                  </div>
                </div>
              </section>
              
              <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">İletişim</h2>
                <p className="text-gray-300 mb-4">
                  Sorularınız veya sorunlarınız için bize aşağıdaki kanallardan ulaşabilirsiniz:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-gray-300">E-posta: <a href="mailto:destek@pii.email" className="text-blue-400 hover:text-blue-300">destek@pii.email</a></p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                    <div>
                      <p className="text-gray-300">Canlı Destek: Pazartesi-Cuma, 09:00-18:00 saatleri arasında canlı destek hizmetimiz aktiftir.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="text-gray-300">Telefon: +90 (212) 123 45 67</p>
                    </div>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4 text-blue-300">Yardım Kaynakları</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="#" className="block p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-colors">
                    <h3 className="text-lg font-medium mb-2 text-blue-200 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Kullanım Kılavuzu
                    </h3>
                    <p className="text-gray-300">PiMail'in tüm özelliklerini detaylı bir şekilde anlatan kullanım kılavuzumuza göz atın.</p>
                  </Link>
                  
                  <Link href="#" className="block p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-colors">
                    <h3 className="text-lg font-medium mb-2 text-blue-200 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                      </svg>
                      Video Eğitimler
                    </h3>
                    <p className="text-gray-300">PiMail'i nasıl kullanacağınızı adım adım gösteren video eğitimlerimize ulaşın.</p>
                  </Link>
                  
                  <Link href="#" className="block p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-colors">
                    <h3 className="text-lg font-medium mb-2 text-blue-200 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Bilgi Tabanı
                    </h3>
                    <p className="text-gray-300">Sık sorulan sorular, sorun giderme ve ipuçları içeren kapsamlı bilgi tabanımızı keşfedin.</p>
                  </Link>
                  
                  <Link href="/iletisim" className="block p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-colors">
                    <h3 className="text-lg font-medium mb-2 text-blue-200 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      İletişim Formu
                    </h3>
                    <p className="text-gray-300">Özel sorularınız için iletişim formunu kullanarak bize ulaşabilirsiniz.</p>
                  </Link>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
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