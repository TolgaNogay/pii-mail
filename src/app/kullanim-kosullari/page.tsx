'use client';
import Link from "next/link";
import { motion } from "framer-motion";

export default function KullanimKosullariPage() {
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
            <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Pii.Mail</span>
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
              <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white text-transparent bg-clip-text">pii.email Kullanım Koşulları</h1>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">1. Giriş ve Kabul</h2>
                <p className="text-gray-300 mb-4">
                  Bu Kullanım Koşulları ("Koşullar"), pii.email alan adı altında sunulan e-posta hizmetini ("Hizmet") kullanımınızı düzenleyen yasal bir anlaşmadır. Hizmeti kullanarak, bu Koşulları kabul etmiş sayılırsınız. Lütfen bu Koşulları dikkatlice okuyunuz. Bu Koşulları kabul etmiyorsanız, Hizmeti kullanmayınız.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">2. Hizmet Tanımı</h2>
                <p className="text-gray-300 mb-4">
                  pii.email, kullanıcılara e-posta gönderme, alma, depolama ve yönetme imkanı sunan bir elektronik posta hizmetidir. Hizmetimiz temel e-posta fonksiyonlarını, spam korumasını ve diğer güvenlik özelliklerini içerir.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">3. Hesap Oluşturma ve Güvenlik</h2>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">3.1. Hesap Oluşturma</h3>
                <p className="text-gray-300 mb-4">
                  Hizmeti kullanabilmek için bir pii.email hesabı oluşturmanız gerekmektedir. Kayıt sırasında doğru, güncel ve eksiksiz bilgiler sağlamayı kabul edersiniz.
                </p>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">3.2. Hesap Güvenliği</h3>
                <p className="text-gray-300 mb-4">
                  Hesabınızın güvenliğinden ve gizliliğinden tamamen siz sorumlusunuz. Şifrenizi gizli tutmalı ve hesabınıza yetkisiz erişimleri derhal bildirmelisiniz. Hesabınızdan gerçekleştirilen tüm etkinliklerden siz sorumlusunuz.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">4. Kullanım Kuralları</h2>
                <p className="text-gray-300 mb-4">Hizmeti kullanırken:</p>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">4.1. Yasaklı Faaliyetler</h3>
                <p className="text-gray-300 mb-2">Aşağıdaki faaliyetlerde bulunmayacağınızı kabul edersiniz:</p>
                <ul className="list-disc pl-6 mb-4 text-gray-300 space-y-1">
                  <li>Spam veya istenmeyen toplu e-posta göndermek</li>
                  <li>Yasa dışı, zararlı, tehdit edici, taciz edici, karalayıcı, müstehcen veya başka şekilde sakıncalı içerik göndermek</li>
                  <li>Virüs, kötü amaçlı yazılım veya diğer zararlı kodları yaymak</li>
                  <li>Başkalarının telif hakkı, ticari marka veya fikri mülkiyet haklarını ihlal eden içerik göndermek</li>
                  <li>Başkalarının kimliğine bürünmek veya yanlış beyan etmek</li>
                  <li>Hizmeti kötüye kullanmak veya aşırı yüklemek</li>
                </ul>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">4.2. Depolama Sınırlamaları</h3>
                <p className="text-gray-300 mb-4">
                  Her hesap için belirli bir depolama sınırı sağlanmaktadır. Bu sınıra ulaşıldığında, yeni e-postalar alamayabilirsiniz veya ek depolama satın almanız gerekebilir.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">5. Gizlilik ve Veri Koruma</h2>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">5.1. Gizlilik Politikası</h3>
                <p className="text-gray-300 mb-4">
                  Kişisel verilerinizin nasıl toplandığı, kullanıldığı ve paylaşıldığı hakkında bilgi için <Link href="/gizlilik" className="text-blue-400 hover:text-blue-300">Gizlilik Politikamızı</Link> inceleyiniz. Hizmeti kullanarak, Gizlilik Politikamızı kabul etmiş sayılırsınız.
                </p>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">5.2. Veri Güvenliği</h3>
                <p className="text-gray-300 mb-4">
                  Verilerinizi korumak için endüstri standardı güvenlik önlemleri uygulamamıza rağmen, internet üzerinden iletilen veya depolanan bilgilerin mutlak güvenliğini garanti edemeyiz.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">6. Fikri Mülkiyet Hakları</h2>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">6.1. Hizmet Üzerindeki Haklar</h3>
                <p className="text-gray-300 mb-4">
                  Hizmet, içeriği, yazılımı ve tüm fikri mülkiyet hakları pii.email'e aittir. Bu Koşullar, Hizmeti kullanmanız için sınırlı, münhasır olmayan, devredilemez ve iptal edilebilir bir lisans sağlar.
                </p>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">6.2. Kullanıcı İçeriği</h3>
                <p className="text-gray-300 mb-4">
                  E-postalarınız ve diğer içerikleriniz üzerindeki tüm haklarınızı saklı tutarsınız. Bununla birlikte, bu içeriği depolamak ve iletmek için pii.email'e sınırlı bir lisans verirsiniz.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">7. Hizmet Değişiklikleri ve Sonlandırma</h2>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">7.1. Hizmet Değişiklikleri</h3>
                <p className="text-gray-300 mb-4">
                  pii.email, önceden bildirimde bulunmaksızın Hizmeti değiştirme, askıya alma veya sonlandırma hakkını saklı tutar.
                </p>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">7.2. Hesap Sonlandırma</h3>
                <p className="text-gray-300 mb-4">
                  pii.email, bu Koşulları ihlal etmeniz durumunda hesabınızı askıya alma veya sonlandırma hakkını saklı tutar. Ayrıca, hesabınızı istediğiniz zaman sonlandırabilirsiniz.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">8. Sorumluluk Sınırlamaları</h2>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">8.1. Garanti Reddi</h3>
                <p className="text-gray-300 mb-4">
                  Hizmet "olduğu gibi" ve "mevcut olduğu şekliyle" sunulmaktadır. pii.email, Hizmetin kesintisiz veya hatasız olacağını garanti etmez.
                </p>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">8.2. Sorumluluk Sınırlaması</h3>
                <p className="text-gray-300 mb-4">
                  pii.email, doğrudan, dolaylı, arızi, özel veya sonuç olarak ortaya çıkan zararlardan sorumlu tutulamaz.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">9. Uyuşmazlık Çözümü</h2>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">9.1. Geçerli Hukuk</h3>
                <p className="text-gray-300 mb-4">
                  Bu Koşullar, Türkiye Cumhuriyeti kanunlarına tabidir ve bu kanunlara göre yorumlanacaktır.
                </p>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">9.2. Uyuşmazlık Çözümü</h3>
                <p className="text-gray-300 mb-4">
                  Bu Koşullardan kaynaklanan herhangi bir uyuşmazlık, Türkiye Cumhuriyeti mahkemelerinde çözümlenecektir.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">10. Genel Hükümler</h2>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">10.1. Koşullarda Değişiklik</h3>
                <p className="text-gray-300 mb-4">
                  pii.email, bu Koşulları herhangi bir zamanda değiştirme hakkını saklı tutar. Değişiklikler, web sitemizde yayınlandıktan sonra geçerli olacaktır.
                </p>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">10.2. Bölünebilirlik</h3>
                <p className="text-gray-300 mb-4">
                  Bu Koşulların herhangi bir hükmü geçersiz veya uygulanamaz hale gelirse, diğer hükümler tam olarak yürürlükte kalacaktır.
                </p>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">10.3. İletişim</h3>
                <p className="text-gray-300 mb-4">
                  Bu Koşullar veya Hizmet hakkında sorularınız varsa, lütfen <a href="mailto:support@pii.email" className="text-blue-400 hover:text-blue-300">support@pii.email</a> adresinden bizimle iletişime geçiniz.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">11. Son Güncelleme</h2>
                <p className="text-gray-300 mb-4">
                  Bu Kullanım Koşulları en son 15 Mart 2025 tarihinde güncellenmiştir.
                </p>
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