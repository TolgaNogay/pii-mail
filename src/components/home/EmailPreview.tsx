import React from 'react';
import Image from 'next/image';

const EmailPreview = () => {
  return (
    <div className="w-full max-w-5xl mt-8 relative">
      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden shadow-2xl relative">
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
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                  <Image 
                    src="/images/logo.svg" 
                    alt="Pii.Mail" 
                    width={20} 
                    height={20} 
                    className="w-4 h-4"
                  />
                </div>
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
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold mr-3 shadow-lg shadow-blue-500/20">
                  <Image 
                    src="/images/logo.svg" 
                    alt="Pii.Mail" 
                    width={24} 
                    height={24} 
                    className="w-5 h-5"
                  />
                </div>
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
    </div>
  );
};

export default EmailPreview; 