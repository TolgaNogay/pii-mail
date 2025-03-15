'use client';
import Link from "next/link";
import { motion } from "framer-motion";

export default function GizlilikPolitikasiPage() {
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
              <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white text-transparent bg-clip-text">pii.email Gizlilik Politikası ve Tanımlama Bilgileri (Çerezler)</h1>
              
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">1. Giriş</h2>
                <p className="text-gray-300 mb-4">
                  Bu Gizlilik Politikası, pii.email ("biz", "bizim" veya "Şirket") tarafından sunulan e-posta hizmetini kullanımınız sırasında kişisel verilerinizin nasıl toplandığını, kullanıldığını, paylaşıldığını ve korunduğunu açıklar. Hizmetimizi kullanarak, bu politikada belirtilen uygulamaları kabul etmiş sayılırsınız.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">2. Topladığımız Bilgiler</h2>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">2.1. Kayıt Bilgileri</h3>
                <p className="text-gray-300 mb-2">Hizmete kaydolduğunuzda, aşağıdaki bilgileri toplayabiliriz:</p>
                <ul className="list-disc pl-6 mb-4 text-gray-300 space-y-1">
                  <li>Ad ve soyadı</li>
                  <li>E-posta adresi</li>
                  <li>Telefon numarası (isteğe bağlı)</li>
                  <li>Doğum tarihi</li>
                  <li>Ülke/bölge bilgisi</li>
                </ul>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">2.2. Kullanım Verileri</h3>
                <p className="text-gray-300 mb-2">Hizmetimizle etkileşiminiz sırasında aşağıdaki verileri otomatik olarak toplayabiliriz:</p>
                <ul className="list-disc pl-6 mb-4 text-gray-300 space-y-1">
                  <li>IP adresi</li>
                  <li>Cihaz bilgileri (tarayıcı türü, işletim sistemi)</li>
                  <li>Giriş zamanları ve süreleri</li>
                  <li>Tıklama verileri ve gezinme bilgileri</li>
                  <li>E-posta kullanım istatistikleri (gönderilen/alınan e-posta sayısı, boyutu)</li>
                </ul>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">2.3. E-posta İçeriği</h3>
                <p className="text-gray-300 mb-4">
                  E-posta mesajlarınızın içeriği, alıcılar, ekler ve meta veriler gibi hizmeti sunmak için gerekli bilgileri işleriz.
                </p>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">2.4. Çerezler ve Benzer Teknolojiler</h3>
                <p className="text-gray-300 mb-4">
                  Web sitemizde ve hizmetlerimizde çerezler, piksel etiketleri ve benzer teknolojiler kullanırız. Bu teknolojiler, deneyiminizi kişiselleştirmemize, site kullanımını analiz etmemize ve güvenliği sağlamamıza yardımcı olur.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">3. Bilgilerin Kullanımı</h2>
                <p className="text-gray-300 mb-4">Topladığımız bilgileri aşağıdaki amaçlar için kullanırız:</p>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">3.1. Hizmet Sunumu</h3>
                <ul className="list-disc pl-6 mb-4 text-gray-300 space-y-1">
                  <li>E-posta hizmetlerini sağlamak ve yönetmek</li>
                  <li>Hesabınızı oluşturmak ve sürdürmek</li>
                  <li>Müşteri desteği sağlamak</li>
                  <li>Teknik sorunları gidermek</li>
                </ul>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">3.2. Hizmet İyileştirme</h3>
                <ul className="list-disc pl-6 mb-4 text-gray-300 space-y-1">
                  <li>Hizmetlerimizi geliştirmek ve optimize etmek</li>
                  <li>Yeni özellikler tasarlamak</li>
                  <li>Kullanıcı deneyimini analiz etmek ve iyileştirmek</li>
                </ul>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">3.3. Güvenlik ve Doğrulama</h3>
                <ul className="list-disc pl-6 mb-4 text-gray-300 space-y-1">
                  <li>Hesabınızı korumak</li>
                  <li>Dolandırıcılık ve kötüye kullanımı önlemek</li>
                  <li>Hizmet kullanım koşullarına uyumu sağlamak</li>
                </ul>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">3.4. İletişim</h3>
                <ul className="list-disc pl-6 mb-4 text-gray-300 space-y-1">
                  <li>Hizmet güncellemeleri, güvenlik uyarıları ve destek mesajları göndermek</li>
                  <li>Sizin izninizle pazarlama iletişimleri sağlamak</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">4. Çerezler ve Benzer Teknolojiler</h2>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">4.1. Kullandığımız Çerez Türleri</h3>
                
                <p className="text-gray-300 mb-2 font-medium">Zorunlu Çerezler:</p>
                <p className="text-gray-300 mb-4">
                  Bu çerezler, web sitemizin temel işlevlerini sağlamak için gereklidir ve kapatılamazlar. Bunlar genellikle yalnızca sizin eylemlerinize yanıt olarak ayarlanır, örneğin hizmet tercihleri ayarlamak, oturum açmak veya form doldurmak gibi.
                </p>
                
                <p className="text-gray-300 mb-2 font-medium">Performans Çerezleri:</p>
                <p className="text-gray-300 mb-4">
                  Bu çerezler, ziyaretçilerin web sitemizi nasıl kullandığı hakkında bilgi toplar ve performans metriklerimizi izlememize yardımcı olur. Bu çerezler, ziyaretçileri tanımlamaz.
                </p>
                
                <p className="text-gray-300 mb-2 font-medium">İşlevsellik Çerezleri:</p>
                <p className="text-gray-300 mb-4">
                  Bu çerezler, web sitemizi kullandığınızda yaptığınız seçimleri hatırlamak için kullanılır. Bu, kullanıcı deneyiminizi kişiselleştirmemize olanak tanır.
                </p>
                
                <p className="text-gray-300 mb-2 font-medium">Hedefleme/Reklam Çerezleri:</p>
                <p className="text-gray-300 mb-4">
                  Bu çerezler, ziyaret ettiğiniz web sitelerini takip eder ve ilgi alanlarınıza göre hedeflenmiş reklamlar sunmak için kullanılabilir.
                </p>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">4.2. Çerez Kontrolü</h3>
                <p className="text-gray-300 mb-4">
                  Çoğu web tarayıcısı, çerezleri kabul etmeyi veya reddetmeyi seçmenize olanak tanır. Tarayıcı ayarlarınızı değiştirerek çerezleri kontrol edebilirsiniz. Ancak, çerezleri devre dışı bırakırsanız, hizmetimizin bazı özelliklerinin düzgün çalışmayabileceğini unutmayın.
                </p>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">4.3. "Beni Takip Etme" Sinyalleri</h3>
                <p className="text-gray-300 mb-4">
                  Bazı tarayıcılar "Beni Takip Etme" (DNT) sinyali iletebilir. Şu anda DNT sinyallerine yanıt vermek için standart bir endüstri yaklaşımı bulunmadığından, şu anda bu sinyallere yanıt vermiyoruz.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">5. Bilgi Paylaşımı</h2>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">5.1. Hizmet Sağlayıcılar</h3>
                <p className="text-gray-300 mb-4">
                  Hizmetlerimizi sunmamıza, iş faaliyetlerimizi yürütmemize veya sizlere hizmet vermemize yardımcı olan üçüncü taraf şirketlerle ve bireylerle çalışabiliriz. Bu hizmet sağlayıcılar, yalnızca bizim adımıza belirli işlevleri yerine getirmek için gerekli bilgilere erişebilir ve başka amaçlarla kullanamaz veya ifşa edemezler.
                </p>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">5.2. Yasal Gereklilikler</h3>
                <p className="text-gray-300 mb-4">
                  Yasal bir yükümlülüğe uymak, pii.email'in haklarını veya mülkiyetini korumak, hizmetlerimizin güvenliğini sağlamak veya kamu güvenliğini korumak için kişisel bilgilerinizi paylaşabiliriz.
                </p>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">5.3. İşletme Transferleri</h3>
                <p className="text-gray-300 mb-4">
                  Şirket birleşmesi, satın alma veya varlık satışı durumunda, kişisel bilgileriniz aktarılan varlıklar arasında olabilir. Bu tür bir transferden önce sizi bilgilendireceğiz.
                </p>
                
                <h3 className="text-lg font-medium mb-2 text-blue-200">5.4. İzninizle</h3>
                <p className="text-gray-300 mb-4">
                  Yukarıda belirtilenler dışında, izninizi aldıktan sonra bilgilerinizi üçüncü taraflarla paylaşabiliriz.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">6. Veri Güvenliği</h2>
                <p className="text-gray-300 mb-4">
                  Kişisel bilgilerinizi yetkisiz erişime, kullanıma, değiştirmeye ve ifşaya karşı korumak için uygun güvenlik önlemleri alıyoruz. Bu önlemler şunları içerir:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-300 space-y-1">
                  <li>Şifreleme teknolojileri</li>
                  <li>Güvenli ağ mimarisi</li>
                  <li>Düzenli güvenlik denetimleri</li>
                  <li>Çalışan erişim kontrolü ve eğitimi</li>
                </ul>
                <p className="text-gray-300 mb-4">
                  Ancak, internet üzerinden hiçbir veri iletimi veya depolama yönteminin %100 güvenli olmadığını unutmayın. Bu nedenle, mutlak güvenliği garanti edemeyiz.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">7. Veri Saklama</h2>
                <p className="text-gray-300 mb-4">
                  Kişisel bilgilerinizi, hizmetlerimizi sağlamak için gerekli olduğu sürece veya yasal olarak saklamakla yükümlü olduğumuz sürece saklarız. Hesabınızı sildiğinizde, kişisel verileriniz makul bir süre içinde sistemlerimizden silinecektir. Ancak, yasal yükümlülüklerimize uymak, anlaşmazlıkları çözmek veya sözleşmelerimizi uygulamak için bazı bilgileri daha uzun süre saklayabiliriz.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">8. Çocukların Gizliliği</h2>
                <p className="text-gray-300 mb-4">
                  Hizmetlerimiz, 13 yaşın altındaki çocuklar için tasarlanmamıştır. 13 yaşın altındaki çocuklardan bilerek kişisel bilgi toplamayız. Eğer 13 yaşın altındaki bir çocuğun bize kişisel bilgi sağladığını öğrenirsek, bu bilgileri kayıtlarımızdan silmek için adımlar atarız.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">9. Uluslararası Veri Transferleri</h2>
                <p className="text-gray-300 mb-4">
                  pii.email küresel bir hizmet olduğundan, kişisel bilgileriniz farklı ülkelere transfer edilebilir ve bu ülkelerde işlenebilir. Bu durumda, bilgilerinizin bu politikaya uygun olarak korunmasını sağlamak için uygun önlemleri alacağız.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">10. Haklarınız</h2>
                <p className="text-gray-300 mb-4">
                  Bölgenize bağlı olarak, kişisel verilerinizle ilgili belirli haklara sahip olabilirsiniz:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-300 space-y-1">
                  <li>Bilgilerinize erişme ve onların kopyasını alma hakkı</li>
                  <li>Yanlış veya eksik bilgilerin düzeltilmesini talep etme hakkı</li>
                  <li>Belirli koşullar altında bilgilerinizin silinmesini talep etme hakkı</li>
                  <li>İşleme faaliyetlerimizi kısıtlama hakkı</li>
                  <li>Veri taşınabilirliği hakkı</li>
                  <li>İşlemeye itiraz etme hakkı</li>
                </ul>
                <p className="text-gray-300 mb-4">
                  Bu haklarınızı kullanmak için lütfen aşağıdaki iletişim bilgilerini kullanarak bizimle iletişime geçin.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">11. Değişiklikler</h2>
                <p className="text-gray-300 mb-4">
                  Bu Gizlilik Politikası'nı zaman zaman güncelleyebiliriz. Politikada önemli değişiklikler yaparsak, değişiklikler yürürlüğe girmeden önce e-posta veya web sitemiz üzerinden bir bildirim yayınlayarak sizi bilgilendireceğiz.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">12. İletişim</h2>
                <p className="text-gray-300 mb-4">
                  Bu Gizlilik Politikası veya kişisel bilgilerinizin işlenmesi hakkında sorularınız, endişeleriniz veya talepleriniz varsa, lütfen bizimle iletişime geçin:
                </p>
                <p className="text-gray-300 mb-4">
                  <strong>E-posta:</strong> <a href="mailto:privacy@pii.email" className="text-blue-400 hover:text-blue-300">privacy@pii.email</a><br />
                  <strong>Posta Adresi:</strong> Antalya, Türkiye, 07000                  <br />
                  <strong>Veri Koruma Görevlisi:</strong> <a href="mailto:dpo@pii.email" className="text-blue-400 hover:text-blue-300">dpo@pii.email</a>
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-blue-300">13. Son Güncelleme</h2>
                <p className="text-gray-300 mb-4">
                  Bu Gizlilik Politikası en son 15 Mart 2025 tarihinde güncellenmiştir.
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