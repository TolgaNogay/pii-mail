'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function EmailPreview() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-24">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="inline-block mb-3 px-4 py-1.5 bg-indigo-500/10 rounded-full text-indigo-400 text-sm font-medium border border-indigo-500/20">
          Modern Arayüz
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-white via-indigo-100 to-white text-transparent bg-clip-text">
          E-posta Yönetimi Artık Daha Kolay
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          PiMail'in modern ve kullanıcı dostu arayüzü ile e-postalarınızı yönetmek hiç bu kadar kolay olmamıştı.
        </p>
      </motion.div>

      <div className="relative">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 md:p-8 shadow-2xl shadow-indigo-500/10"
        >
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64 shrink-0">
              <div className="space-y-4">
                <button className="w-full px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-lg text-sm font-medium text-left hover:bg-indigo-500/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"></path><polyline points="15,9 18,9 18,13"></polyline><path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2v0"></path><line x1="6" y1="10" x2="7" y2="10"></line></svg>
                    <span>Gelen Kutusu</span>
                    <span className="ml-auto bg-indigo-500/30 px-2 py-0.5 rounded-full text-xs">24</span>
                  </div>
                </button>
                <button className="w-full px-4 py-2 text-gray-400 rounded-lg text-sm font-medium text-left hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>
                    <span>Gönderilenler</span>
                  </div>
                </button>
                <button className="w-full px-4 py-2 text-gray-400 rounded-lg text-sm font-medium text-left hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"></path></svg>
                    <span>Önemli</span>
                  </div>
                </button>
                <button className="w-full px-4 py-2 text-gray-400 rounded-lg text-sm font-medium text-left hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                    <span>Çöp Kutusu</span>
                  </div>
                </button>
              </div>

              <div className="mt-8">
                <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3 px-4">Etiketler</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-4 py-1 text-sm">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    <span className="text-gray-400">İş</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-1 text-sm">
                    <span className="w-2 h-2 rounded-full bg-green-400"></span>
                    <span className="text-gray-400">Kişisel</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-1 text-sm">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    <span className="text-gray-400">Projeler</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Email List */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="E-posta ara..."
                    className="w-64 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-300 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M7 12h10"></path><path d="M10 18h4"></path></svg>
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-300 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {[1, 2, 3].map((index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                        <span className="text-indigo-400 font-medium">
                          {String.fromCharCode(65 + index)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-white truncate group-hover:text-indigo-400 transition-colors">
                            {["Yeni Proje Teklifi", "Toplantı Notları", "Haftalık Rapor"][index - 1]}
                          </h4>
                          <span className="text-xs text-gray-500">
                            {["14:30", "12:15", "Dün"][index - 1]}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 truncate">
                          {[
                            "Merhaba, yeni proje teklifimizi inceleyebilir misiniz?",
                            "Bugünkü toplantının önemli noktalarını özetledim.",
                            "Geçen haftanın performans raporunu ekte bulabilirsiniz."
                          ][index - 1]}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
} 