'use client';
import Link from "next/link";
import { motion } from "framer-motion";

export default function HakkimizdaPage() {
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
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">Ana Sayfa</Link>
            <Link href="/giris" className="text-gray-300 hover:text-white transition-colors">Giriş Yap</Link>
            <Link href="/kayit-ol" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors">Kayıt Ol</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-16 relative z-10">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-white text-transparent bg-clip-text">Hakkımızda</h1>
          
          <div className="space-y-12">
            <section className="bg-gray-900/50 backdrop-blur-md p-8 rounded-xl border border-gray-800 shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">Vizyonumuz</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                PiMail olarak, dijital iletişimde gizlilik ve güvenliğin temel bir hak olduğuna inanıyoruz. Vizyonumuz, kullanıcıların verilerinin tam kontrolünü elinde tuttuğu, güvenli, hızlı ve kullanıcı dostu bir e-posta deneyimi sunmaktır.
              </p>
              <p className="text-gray-300 leading-relaxed">
                İnternet üzerindeki her iletişimin güvenli, özel ve kullanıcı kontrolünde olması gerektiğine inanıyoruz. Teknolojimiz, bu vizyonu gerçeğe dönüştürmek için tasarlanmıştır.
              </p>
            </section>
            
            <section className="bg-gray-900/50 backdrop-blur-md p-8 rounded-xl border border-gray-800 shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">Hikayemiz</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                PiMail, 2025 yılında bir grup gizlilik ve güvenlik tutkunu tarafından kuruldu. Büyük teknoloji şirketlerinin kullanıcı verilerini nasıl işlediğini gözlemledikten sonra, alternatif bir çözüm sunma ihtiyacı hissettik.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Yolculuğumuz, kişisel verilerin korunması ve dijital gizliliğin sağlanması misyonuyla başladı. İlk prototipimizi geliştirdikten sonra, kullanıcı geri bildirimleri doğrultusunda sürekli olarak platformumuzu iyileştirdik.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Bugün, PiMail olarak binlerce kullanıcıya hizmet veriyoruz ve her gün daha fazla kişinin güvenli iletişim hakkını savunuyoruz.
              </p>
            </section>
            
            <section className="bg-gray-900/50 backdrop-blur-md p-8 rounded-xl border border-gray-800 shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">Değerlerimiz</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-semibold mb-2 text-blue-300">Gizlilik</h3>
                  <p className="text-gray-300">Kullanıcı verilerinin gizliliği bizim için en önemli önceliktir. Hiçbir şekilde verilerinizi üçüncü taraflarla paylaşmaz veya reklam amaçlı kullanmayız.</p>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-semibold mb-2 text-purple-300">Güvenlik</h3>
                  <p className="text-gray-300">En son güvenlik teknolojilerini kullanarak, verilerinizin her zaman korunmasını sağlıyoruz. Uçtan uca şifreleme ve güvenli sunucu altyapımız ile verileriniz güvende.</p>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-semibold mb-2 text-green-300">Şeffaflık</h3>
                  <p className="text-gray-300">Nasıl çalıştığımız, verilerinizi nasıl işlediğimiz ve güvenlik önlemlerimiz konusunda her zaman şeffafız. Açık kaynak kodlu bileşenlerimiz ile güvenimizi pekiştiriyoruz.</p>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-semibold mb-2 text-yellow-300">Kullanıcı Odaklılık</h3>
                  <p className="text-gray-300">Her kararımızda kullanıcı deneyimini ön planda tutuyoruz. Platformumuz, kullanıcı geri bildirimleri doğrultusunda sürekli olarak geliştirilmektedir.</p>
                </div>
              </div>
            </section>
            
            <section className="bg-gray-900/50 backdrop-blur-md p-8 rounded-xl border border-gray-800 shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">Bize Ulaşın</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Sorularınız, önerileriniz veya işbirliği teklifleriniz için bizimle iletişime geçebilirsiniz.
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <Link href="/iletisim" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition-colors text-center">
                  İletişim Formu
                </Link>
                <a href="mailto:info@piimail.com" className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors text-center">
                  info@piimail.com
                </a>
              </div>
            </section>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-gray-800/50 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm opacity-30"></div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white relative z-10">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">PiMail</span>
              </Link>
              <p className="text-gray-500 text-sm mt-2">© 2025 PiMail Inc. — tüm hakları saklıdır.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/hakkimizda" className="text-gray-400 hover:text-white transition-colors">Hakkımızda</Link>
              <Link href="/ozellikler" className="text-gray-400 hover:text-white transition-colors">Özellikler</Link>
              <Link href="/fiyatlandirma" className="text-gray-400 hover:text-white transition-colors">Fiyatlandırma</Link>
              <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link>
              <Link href="/iletisim" className="text-gray-400 hover:text-white transition-colors">İletişim</Link>
              <Link href="/gizlilik" className="text-gray-400 hover:text-white transition-colors">Gizlilik</Link>
              <Link href="/kullanim-kosullari" className="text-gray-400 hover:text-white transition-colors">Kullanım Şartları</Link>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
} 