'use client';
import Link from "next/link";
import { motion } from "framer-motion";

export default function KariyerPage() {
  const openPositions = [
    {
      id: 1,
      title: "Senior Frontend Geliştirici",
      department: "Mühendislik",
      location: "Remote/İstanbul",
      type: "Tam Zamanlı",
      description: "Modern web teknolojileri ile kullanıcı deneyimini en üst seviyeye çıkaracak yetenekli frontend geliştiriciler arıyoruz.",
      requirements: [
        "React ve Next.js ile en az 3 yıl deneyim",
        "Modern CSS ve responsive tasarım konusunda uzmanlık",
        "State management (Redux, Context API veya benzeri) konusunda deneyim",
        "UI/UX prensipleri konusunda bilgi sahibi olmak",
        "TypeScript deneyimi",
        "Komponent tabanlı geliştirme konusunda bilgi sahibi olmak"
      ]
    },
    {
      id: 2,
      title: "Backend Geliştirici",
      department: "Mühendislik",
      location: "Remote/İstanbul",
      type: "Tam Zamanlı",
      description: "E-posta sistemlerini ve güvenli veri depolama altyapısını geliştirmeye yardımcı olacak backend geliştiriciler arıyoruz.",
      requirements: [
        "Node.js ile en az 2 yıl deneyim",
        "RESTful API geliştirme konusunda deneyim",
        "PostgreSQL veya benzeri veritabanları ile çalışma deneyimi",
        "Güvenlik ve şifreleme standartları bilgisi",
        "IMAP/SMTP protokolleri hakkında bilgi",
        "Mikroservis mimarisi konusunda deneyim bir avantaj olacaktır"
      ]
    },
    {
      id: 3,
      title: "Güvenlik Uzmanı",
      department: "Güvenlik",
      location: "Remote/İstanbul",
      type: "Tam Zamanlı",
      description: "Platformumuzun güvenliğini sağlamak ve sürekli iyileştirmek için güvenlik uzmanları arıyoruz.",
      requirements: [
        "Bilgi güvenliği alanında en az 4 yıl deneyim",
        "Penetrasyon testi ve güvenlik açığı analizi konusunda deneyim",
        "Şifreleme standartları ve protokolleri hakkında derin bilgi",
        "OWASP Top 10 ve güvenli kod geliştirme prensipleri konusunda uzmanlık",
        "Güvenlik sertifikaları (CEH, CISSP veya benzeri) bir avantaj olacaktır"
      ]
    },
    {
      id: 4,
      title: "UX/UI Tasarımcı",
      department: "Tasarım",
      location: "Remote/İstanbul",
      type: "Tam Zamanlı", 
      description: "Kullanıcı odaklı, sezgisel ve çekici arayüzler tasarlayarak ürünümüzü ileriye taşıyacak tasarımcılar arıyoruz.",
      requirements: [
        "UX/UI tasarımı konusunda en az 3 yıl deneyim",
        "Figma, Sketch veya benzeri tasarım araçlarında uzmanlık",
        "Kullanıcı araştırması ve persona oluşturma konusunda deneyim",
        "Erişilebilirlik (accessibility) standartları konusunda bilgi",
        "Responsive tasarım prensipleri konusunda deneyim",
        "Tasarım sistemleri oluşturma ve yönetme deneyimi bir avantaj olacaktır"
      ]
    }
  ];

  const values = [
    {
      title: "Şeffaflık",
      description: "Tüm iş süreçlerimizde açık ve dürüst iletişime değer veriyoruz.",
      color: "blue"
    },
    {
      title: "İnovasyon",
      description: "Sürekli öğrenmeyi ve yeni fikirleri denemeyi teşvik ediyoruz.",
      color: "purple"
    },
    {
      title: "İş-Yaşam Dengesi",
      description: "Çalışanlarımızın profesyonel ve kişisel yaşamları arasındaki dengeyi önemsiyoruz.",
      color: "green"
    },
    {
      title: "Çeşitlilik ve Kapsayıcılık",
      description: "Farklı geçmiş ve perspektiflere sahip insanları bir araya getirerek daha güçlü bir ekip oluşturuyoruz.",
      color: "yellow"
    }
  ];

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

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white text-transparent bg-clip-text"
          >
            Geleceği Bizimle Şekillendirin
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto"
          >
            PiMail'de güvenli iletişimin geleceğini şekillendiren yetenekli ve tutkulu bir ekibin parçası olun.
          </motion.p>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#positions" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition-colors">
              Açık Pozisyonlar
            </a>
            <a href="#values" className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors">
              Değerlerimiz
            </a>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Why Join Us Section */}
          <section className="mb-16">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-900/50 backdrop-blur-md p-8 rounded-xl border border-gray-800 shadow-xl"
            >
              <h2 className="text-2xl font-bold mb-6 text-blue-400">Neden PiMail?</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  PiMail'de çalışmak, dijital iletişimin geleceğini yeniden şekillendiren bir ekibin parçası olmak demektir. Biz sadece bir e-posta servisi sunmuyoruz; 
                  kullanıcıların gizliliğini ve verilerinin güvenliğini ön planda tutan, yenilikçi bir platform oluşturuyoruz.
                </p>
                <p>
                  Ekibimize katılan herkes, fikirleriyle doğrudan ürünümüzü etkileme ve milyonlarca insanın hayatına dokunma fırsatına sahip olur. Yatay bir hiyerarşi yapısıyla, 
                  her fikre değer verilen, açık iletişimi teşvik eden bir çalışma ortamı sunuyoruz.
                </p>
                <p>
                  Çalışanlarımıza esnek çalışma saatleri, rekabetçi maaş paketleri, sürekli öğrenme ve gelişim fırsatları sunuyoruz. Ekip olarak büyür, öğrenir ve 
                  dijital dünyada anlamlı bir iz bırakırız.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Company Values */}
          <section id="values" className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Değerlerimiz</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div 
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="p-6 bg-gray-900/50 backdrop-blur-md rounded-xl border border-gray-800 shadow-xl"
                >
                  <h3 className={`text-xl font-semibold mb-3 text-${value.color}-400`}>{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Open Positions */}
          <section id="positions" className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Açık Pozisyonlar</h2>
            
            <div className="space-y-6">
              {openPositions.map((position) => (
                <motion.div 
                  key={position.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * position.id }}
                  className="bg-gray-900/50 backdrop-blur-md rounded-xl border border-gray-800 shadow-xl overflow-hidden"
                >
                  <div className="p-6 border-b border-gray-800">
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{position.title}</h3>
                        <div className="flex flex-wrap gap-3 text-sm">
                          <span className="px-3 py-1 bg-blue-900/40 text-blue-400 rounded-full">{position.department}</span>
                          <span className="px-3 py-1 bg-purple-900/40 text-purple-400 rounded-full">{position.location}</span>
                          <span className="px-3 py-1 bg-green-900/40 text-green-400 rounded-full">{position.type}</span>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-sm font-medium transition-colors">
                        Başvur
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-300 mb-4">{position.description}</p>
                    
                    <h4 className="font-semibold text-blue-400 mb-2">Gereksinimler:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                      {position.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Application Process */}
          <section className="mb-16">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900/50 backdrop-blur-md p-8 rounded-xl border border-gray-800 shadow-xl"
            >
              <h2 className="text-2xl font-bold mb-6 text-purple-400">Başvuru Süreci</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center flex-shrink-0 border border-blue-700">
                    <span className="text-blue-400 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Online Başvuru</h3>
                    <p className="text-gray-300">İlgilendiğiniz pozisyon için özgeçmişiniz ve kısa bir başvuru mektubu ile başvurunuzu yapın.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center flex-shrink-0 border border-purple-700">
                    <span className="text-purple-400 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">İlk Görüşme</h3>
                    <p className="text-gray-300">Kısa bir telefon veya video görüşmesi ile tanışıp, pozisyon hakkında daha detaylı bilgi vereceğiz.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-900/50 flex items-center justify-center flex-shrink-0 border border-green-700">
                    <span className="text-green-400 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Teknik Değerlendirme</h3>
                    <p className="text-gray-300">Pozisyona bağlı olarak, teknik bilgi ve becerilerinizi değerlendirmek için küçük bir proje veya teknik mülakat gerçekleştireceğiz.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-900/50 flex items-center justify-center flex-shrink-0 border border-yellow-700">
                    <span className="text-yellow-400 font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Ekip Görüşmesi</h3>
                    <p className="text-gray-300">Potansiyel ekip arkadaşlarınız ve yöneticilerle tanışacağınız, şirket kültürümüzü ve çalışma ortamımızı daha yakından tanıyacağınız bir görüşme.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center flex-shrink-0 border border-blue-700">
                    <span className="text-blue-400 font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Teklif</h3>
                    <p className="text-gray-300">Tüm süreçler başarıyla tamamlandığında, size uygun bir iş teklifinde bulunacağız.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Contact CTA */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-8 rounded-xl border border-blue-800/50 shadow-xl text-center">
              <h2 className="text-2xl font-bold mb-4">Açık Pozisyonlarımızda Yerinizi Bulamadınız mı?</h2>
              <p className="text-gray-300 mb-6">
                Yeteneklerinizi göstermek ve ekibimize katılmak için her zaman açığız. Bize özgeçmişinizi gönderin, uygun bir pozisyon açıldığında sizinle iletişime geçelim.
              </p>
              <a href="mailto:kariyer@piimail.com" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition-colors">
                kariyer@piimail.com
              </a>
            </div>
          </section>
        </div>
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
              <Link href="/kariyer" className="text-gray-400 hover:text-white transition-colors">Kariyer</Link>
              <Link href="/ozellikler" className="text-gray-400 hover:text-white transition-colors">Özellikler</Link>
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