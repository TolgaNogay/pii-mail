import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Features = () => {
  return (
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
          Neden PiMail?
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          PiMail, e-posta deneyiminizi yeniden tanımlayan modern, güvenli ve kullanıcı dostu bir platformdur. İşte PiMail'i özel kılan özellikler:
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-800 backdrop-blur-sm hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all group"
        >
          <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4 text-blue-400 group-hover:bg-blue-500/30 group-hover:scale-110 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-blue-300 transition-colors">Güvenli İletişim</h3>
          <p className="text-gray-400">Uçtan uca şifreleme ile mesajlarınız her zaman güvende. Verileriniz yalnızca sizin kontrolünüzde, üçüncü tarafların erişimi olmadan.</p>
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
  );
};

export default Features; 