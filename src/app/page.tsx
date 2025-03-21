'use client';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/ui/Footer";

export default function Home() {
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
            <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Pii.Mail</span>
          </div>
          <div className="flex gap-3">
            <Link 
              href="/giris" 
              className="px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-all text-sm hover:border-white/40"
            >
              Giriş Yap
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4 px-4 py-2 bg-blue-500/10 rounded-full text-blue-400 text-sm font-medium border border-blue-500/20"
          >
            Güvenli ve Gizlilik Odaklı E-posta Deneyimi
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white text-transparent bg-clip-text leading-tight"
          >
            E-postanın geleceği<br />burada başlıyor.
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            PiMail ile e-postayı istediğiniz şekilde deneyimleyin — <span className="text-blue-400 font-medium">gizliliğinizi ve güvenliğinizi</span> ön planda tutan ilk açık kaynaklı e-posta uygulaması. Hızlı, modern ve kullanıcı dostu arayüzü ile e-postalarınızı daha verimli yönetin.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center mb-10"
          >
            <div className="relative w-full max-w-md mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20"></div>
              <div className="relative flex items-center bg-gray-900/80 border border-gray-800 rounded-lg backdrop-blur-sm">
                <input 
                  type="email" 
                  placeholder="ad@pii.email" 
                  className="w-full px-4 py-4 bg-transparent border-0 rounded-l-lg text-white placeholder-gray-500 focus:outline-none focus:ring-0"
                />
                <button className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all rounded-r-lg text-white text-sm font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30">
                  Katıl
                </button>
              </div>
            </div>
            <p className="text-gray-400 text-sm flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              <span><span className="font-semibold text-white">15+</span> kişi bekleme listesine katıldı.</span>
            </p>
          </motion.div>
        </div>
        
        {/* Email Preview */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full max-w-5xl relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-3xl"></div>
          <div className="relative bg-gray-900 rounded-lg border border-gray-800 overflow-hidden shadow-2xl">
            {/* Window Controls */}
            <div className="flex items-center justify-between p-3 border-b border-gray-800 bg-black/40 backdrop-blur-sm">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 text-xs text-gray-500 font-inter">
                data@pii.email
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
                </button>
                <button className="p-1 text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
                </button>
                <button className="p-1 text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
            </div>
            <div className="flex h-[450px]">
              {/* Sidebar */}
              <div className="w-64 border-r border-gray-800 p-3 hidden md:block bg-gray-900/80">
                <div className="mb-6">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="E-posta ara..." 
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">P</div>
                    <span className="font-medium">destek@pii.email</span>
                  </div>
                  <span className="text-xs text-gray-500">14 Şub</span>
                </div>
                
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`p-2.5 rounded-lg transition-all ${i === 1 ? 'bg-gradient-to-r from-blue-600/20 to-blue-500/10 border border-blue-500/30' : 'hover:bg-gray-800/70'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm truncate">
                          {i === 1 ? 'PiMail Ekibi' : 
                           i === 2 ? 'Kariyer Fırsatları' : 
                           i === 3 ? 'Ahmet Yılmaz' : 
                           i === 4 ? (
                             <span className="flex items-center">
                               Netflix Türkiye
                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1 text-blue-500">
                                 <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                               </svg>
                             </span>
                           ) : 
                           'Teknoloji Haberleri'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {i === 1 ? '14/02' : 
                           i === 2 ? '15/02' : 
                           i === 3 ? '16/02' : 
                           i === 4 ? '17/02' : 
                           '18/02'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 truncate">
                        {i === 1 ? 'E-postanın geleceğini birlikte inşa ediyoruz!' : 
                         i === 2 ? 'Yazılım Geliştirici pozisyonu için başvurunuz alındı' : 
                         i === 3 ? 'Hafta sonu planları hakkında konuşabilir miyiz?' : 
                         i === 4 ? 'Yeni içerikler ve özel teklifler sizi bekliyor!' : 
                         'Bu haftanın en önemli teknoloji gelişmeleri ve yenilikler'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Email Content */}
              <div className="flex-1 p-6 bg-gradient-to-b from-gray-900 to-black">
                <div className="mb-6">
                  <div className="flex items-center mb-5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold mr-3 shadow-lg shadow-blue-500/20">P</div>
                    <div>
                      <h3 className="font-medium">destek@pii.email — PiMail Ekibi</h3>
                      <div className="text-xs text-gray-500">14 Şubat 2024, 9:00 ÖÖ</div>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-5 bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">E-postanın geleceğini PiMail ile inşa ediyoruz!</h2>
                  
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      E-posta, onlarca yıldır değişmedi, ancak biz bunu değiştiriyoruz. PiMail, modern özellikleri güvenilirlikle birleştirerek gerçekten sevebileceğiniz bir e-posta deneyimi sunuyor.
                    </p>
                    <p>
                      Misyonumuz, çevrimiçi iletişim şeklinizi dönüştürmek. Sizi bu yolculukta bizimle birlikte olmaya davet ediyoruz!
                    </p>
                    <p>
                      Bugünün dünyasında e-postanın nasıl olabileceğini yeniden hayal etmek için heyecanlıyız. PiMail'e hoş geldiniz!
                    </p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-800 mt-8 text-right">
                  <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-lg text-white text-sm font-medium transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 flex items-center gap-2 ml-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                    PiMail Ekibine Yanıtla
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Features Section */}
        <div className="w-full max-w-6xl mt-24 mb-16">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-3 px-4 py-1.5 bg-blue-500/10 rounded-full text-blue-400 text-sm font-medium border border-blue-500/20">
              Benzersiz Özellikler
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-white via-blue-100 to-white text-transparent bg-clip-text">
              Neden PiMail Tercih Edilmeli?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              PiMail, e-posta deneyiminizi yeniden tanımlayan <strong>modern</strong>, <strong>güvenli</strong> ve <strong>kullanıcı dostu</strong> bir platformdur. İşte PiMail'i özel kılan özellikler:
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-blue-500/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 mb-5 group-hover:bg-blue-500/30 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-all">Gelişmiş Gizlilik</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-all">
                Uçtan uca şifreleme ve gizlilik odaklı tasarım ile verilerinizi koruyoruz. Tüm e-postalarınız güvenle saklanır.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-800 backdrop-blur-sm hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400 group-hover:bg-purple-500/30 group-hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-purple-300 transition-colors">Hızlı Arayüz</h3>
              <p className="text-gray-400">Modern teknolojilerle geliştirilmiş akıcı deneyim. Hiçbir gecikme olmadan e-postalarınızı yönetin ve anında yanıt verin.</p>
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-800 backdrop-blur-sm hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10 transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400 group-hover:bg-indigo-500/30 group-hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-300 transition-colors">Karanlık Tema</h3>
              <p className="text-gray-400">Göz yorgunluğunu azaltan şık tasarım. Gece veya gündüz, her zaman konforlu bir deneyim sunan arayüz.</p>
            </motion.div>
          </div>

          {/* Additional Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 p-8 rounded-xl border border-gray-800 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-purple-300 text-transparent bg-clip-text">Daha Fazla Özellik</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-full bg-green-500/20 text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Akıllı Filtreleme</h4>
                    <p className="text-gray-400 text-sm">Yapay zeka destekli filtreleme ile önemli e-postalarınızı asla kaçırmayın.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-full bg-green-500/20 text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Çoklu Hesap Desteği</h4>
                    <p className="text-gray-400 text-sm">Tüm e-posta hesaplarınızı tek bir arayüzden yönetin.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-full bg-green-500/20 text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Otomatik Yanıtlar</h4>
                    <p className="text-gray-400 text-sm">Tatildeyken veya meşgulken otomatik yanıtlar oluşturun.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-full bg-green-500/20 text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Offline Erişim</h4>
                    <p className="text-gray-400 text-sm">İnternet bağlantınız olmadığında bile e-postalarınıza erişin.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 p-8 rounded-xl border border-gray-800 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-purple-300 text-transparent bg-clip-text">Kullanıcı Deneyimi</h3>
              <div className="space-y-6">
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-xs font-semibold inline-block text-blue-400">Güvenlik</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold inline-block text-blue-400">98%</span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-800">
                    <div style={{ width: "98%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-blue-400"></div>
                  </div>
                </div>
                
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-xs font-semibold inline-block text-purple-400">Hız</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold inline-block text-purple-400">95%</span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-800">
                    <div style={{ width: "95%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-purple-500 to-purple-400"></div>
                  </div>
                </div>
                
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-xs font-semibold inline-block text-indigo-400">Kullanım Kolaylığı</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold inline-block text-indigo-400">92%</span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-800">
                    <div style={{ width: "92%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-indigo-500 to-indigo-400"></div>
                  </div>
                </div>
                
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-xs font-semibold inline-block text-green-400">Kullanıcı Memnuniyeti</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold inline-block text-green-400">97%</span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-800">
                    <div style={{ width: "97%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-green-500 to-green-400"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Call to Action */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <Link 
              href="/ozellikler" 
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-lg text-white font-medium transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 inline-flex items-center gap-2"
            >
              Tüm Özellikleri Keşfedin
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
          </motion.div>
        </div>

        {/* SEO Enhancement: FAQ Section */}
        <div className="w-full max-w-4xl mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-white via-blue-100 to-white text-transparent bg-clip-text">
            Sık Sorulan Sorular
          </h2>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
              <h3 className="text-lg font-medium mb-2 text-white">PiMail nedir?</h3>
              <p className="text-gray-400">
                PiMail, modern, güvenli ve kullanıcı dostu bir e-posta hizmetidir. Gizliliğinizi ve güvenliğinizi ön planda tutan açık kaynaklı bir e-posta çözümü sunuyoruz.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
              <h3 className="text-lg font-medium mb-2 text-white">PiMail'i kullanmak için ücret ödemem gerekiyor mu?</h3>
              <p className="text-gray-400">
                PiMail'in temel özellikleri ücretsizdir. İleri düzey özellikler için uygun fiyatlı premium planlarımız bulunmaktadır.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
              <h3 className="text-lg font-medium mb-2 text-white">E-postalarım ne kadar güvende?</h3>
              <p className="text-gray-400">
                PiMail, uçtan uca şifreleme ve gelişmiş güvenlik protokolleri kullanarak e-postalarınızı korur. Hiçbir üçüncü taraf, siz izin vermedikçe e-postalarınızın içeriğine erişemez.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
              <h3 className="text-lg font-medium mb-2 text-white">Diğer e-posta servislerinden PiMail'e nasıl geçiş yapabilirim?</h3>
              <p className="text-gray-400">
                PiMail, mevcut e-posta hesaplarınızdan kolay aktarım sağlayan araçlar sunar. Tüm e-postalarınızı, kişilerinizi ve klasörlerinizi birkaç tıklama ile PiMail'e aktarabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
