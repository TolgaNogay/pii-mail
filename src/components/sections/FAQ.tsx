'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "PiMail nedir?",
    answer: "PiMail, modern ve güvenli bir e-posta yönetim platformudur. Kullanıcı dostu arayüzü, gelişmiş güvenlik özellikleri ve akıllı filtreleme sistemi ile e-posta deneyiminizi yeniden tanımlar."
  },
  {
    question: "PiMail'i nasıl kullanmaya başlayabilirim?",
    answer: "PiMail'i kullanmaya başlamak için web sitemizden ücretsiz hesap oluşturabilirsiniz. Hesabınızı oluşturduktan sonra, mevcut e-posta hesaplarınızı kolayca PiMail'e bağlayabilirsiniz."
  },
  {
    question: "Verilerim güvende mi?",
    answer: "Evet, verilerinizin güvenliği bizim için en önemli öncelik. Uçtan uca şifreleme, çift faktörlü kimlik doğrulama ve gelişmiş güvenlik protokolleri ile verileriniz her zaman korunur."
  },
  {
    question: "Birden fazla e-posta hesabını yönetebilir miyim?",
    answer: "Evet, PiMail ile birden fazla e-posta hesabını tek bir arayüzden yönetebilirsiniz. Gmail, Outlook ve diğer popüler e-posta sağlayıcılarıyla tam uyumlu çalışır."
  },
  {
    question: "Mobil cihazlardan erişebilir miyim?",
    answer: "Evet, PiMail'e iOS ve Android uygulamalarımız üzerinden mobil cihazlarınızdan erişebilirsiniz. Ayrıca, responsive tasarımı sayesinde tüm mobil tarayıcılardan da kullanabilirsiniz."
  },
  {
    question: "Teknik destek alabilir miyim?",
    answer: "Evet, 7/24 teknik destek ekibimiz size yardımcı olmak için hazır. Canlı destek, e-posta veya bilgi bankamız üzerinden destek alabilirsiniz."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // FAQ'ları iki sütuna böl
  const leftColumnFaqs = faqs.slice(0, Math.ceil(faqs.length / 2));
  const rightColumnFaqs = faqs.slice(Math.ceil(faqs.length / 2));

  const FAQItem = ({ faq, index }: { faq: typeof faqs[0], index: number }) => (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-4"
    >
      <button
        onClick={() => setActiveIndex(activeIndex === index ? null : index)}
        className="w-full text-left p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-purple-500/30 transition-all group"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors pr-8">
            {faq.question}
          </h3>
          <div className={`transform transition-transform duration-200 ${activeIndex === index ? 'rotate-180' : ''}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-400"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
        <AnimatePresence>
          {activeIndex === index && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-24">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="inline-block mb-3 px-4 py-1.5 bg-purple-500/10 rounded-full text-purple-400 text-sm font-medium border border-purple-500/20">
          Sıkça Sorulan Sorular
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-white via-purple-100 to-white text-transparent bg-clip-text">
          Sorularınızı Yanıtlıyoruz
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          PiMail hakkında merak ettiğiniz tüm soruların cevaplarını burada bulabilirsiniz. Başka sorularınız varsa, bize ulaşmaktan çekinmeyin.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <div className="space-y-4">
          {leftColumnFaqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>
        <div className="space-y-4">
          {rightColumnFaqs.map((faq, index) => (
            <FAQItem key={index + leftColumnFaqs.length} faq={faq} index={index + leftColumnFaqs.length} />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center mt-16"
      >
        <p className="text-gray-400 mb-4">
          Başka sorularınız mı var?
        </p>
        <a
          href="/iletisim"
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 rounded-lg text-white font-medium transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 inline-flex items-center gap-2 group"
        >
          <span>Bize Ulaşın</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transform group-hover:translate-x-1 transition-transform"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </motion.div>
    </div>
  );
} 