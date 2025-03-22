'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Footer from "@/components/ui/Footer";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { useWaitlist } from '@/hooks/useWaitlist';
import { track } from '@vercel/analytics';

// Dinamik olarak yüklenen bileşenler
const Features = dynamic(() => import('@/components/sections/Features'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-900/50 rounded-xl" />
});

const FAQ = dynamic(() => import('@/components/sections/FAQ'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-900/50 rounded-xl" />
});

const EmailPreview = dynamic(() => import('@/components/sections/EmailPreview'), {
  loading: () => <div className="h-[450px] animate-pulse bg-gray-900/50 rounded-xl" />
});

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [particles, setParticles] = useState<Array<{ top: string; left: string; delay: string }>>([]);
  const { joinWaitlist, updateWaitlistCount, isLoading, error, waitlistCount } = useWaitlist();

  // Client-side only rendering için useEffect
  useEffect(() => {
    setMounted(true);
    
    // İlk yüklenmede sayıyı alalım
    updateWaitlistCount();

    // 10 saniyede bir sayacı güncelleyelim
    const interval = setInterval(updateWaitlistCount, 10000);

    // Optimize edilmiş parçacık oluşturma
    const generateParticles = () => {
      const newParticles = Array.from({ length: 15 }).map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 2}s`
      }));
      setParticles(newParticles);
    };
    generateParticles();

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await joinWaitlist(email);
    
    if (result.success) {
      track('waitlist_signup', { email });
      setEmail('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } else if (result.alreadyRegistered) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  // Client-side only rendering
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-2 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white font-[family-name:var(--font-geist-sans)] flex flex-col relative overflow-hidden"
    >
      {/* Optimize edilmiş arka plan elementleri */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern with Gradient Overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(0,0,0,0.2), transparent 30%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.4)),
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)
          `,
          backgroundSize: '100% 100%, 32px 32px'
        }}></div>

        {/* Simplified Animated Circles */}
        <div className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px]">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        
        <div className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px]">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/5 to-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Optimized Floating Particles */}
        <div className="absolute inset-0">
          {particles.map((particle, i) => (
            <div
              key={i}
              className={`absolute rounded-full ${
                i % 2 === 0 ? 'w-1 h-1 bg-blue-500/20' : 'w-2 h-2 bg-purple-500/15'
              }`}
              style={{
                top: particle.top,
                left: particle.left,
                animation: `float 4s ease-in-out infinite`,
                animationDelay: particle.delay
              }}
            ></div>
          ))}
        </div>

        {/* Single Code Element */}
        <div
          className="absolute font-mono text-sm whitespace-nowrap animate-float-slow text-blue-500/5"
          style={{
            top: '30%',
            left: '15%',
            transform: 'rotate(6deg)',
          }}
        >
          &lt;encryption&gt;secure_mail&lt;/encryption&gt;
        </div>
      </div>

      {/* Header - Optimize edilmiş */}
      <header className="sticky top-0 z-50 p-4 backdrop-blur-sm bg-black/20 border-b border-white/5">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
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
              className="px-4 py-2 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all text-sm font-medium"
            >
              Giriş Yap
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Optimize edilmiş */}
      <main className="flex-1 flex flex-col relative z-10">
        <div className="flex flex-col items-center justify-center px-4 py-16 md:py-24 relative">
          {/* Enhanced Hero Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Improved Grid Pattern with Gradient Overlay */}
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(to bottom, rgba(0,0,0,0.2), transparent),
                radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)
              `,
              backgroundSize: '100% 100%, 32px 32px'
            }}></div>
            
            {/* Enhanced Animated Circles */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rotate-45">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/10 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute inset-10 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute inset-20 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] -rotate-45">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/10 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute inset-10 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              <div className="absolute inset-20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2.5s' }}></div>
                </div>
                
            {/* Enhanced Gradient Lines */}
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
              <div className="absolute top-1/2 -translate-y-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/10 to-transparent"></div>
              <div className="absolute top-1/2 translate-y-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"></div>
              
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-purple-500/20 to-transparent"></div>
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-24 w-px bg-gradient-to-b from-transparent via-blue-500/10 to-transparent"></div>
              <div className="absolute top-0 bottom-0 left-1/2 translate-x-24 w-px bg-gradient-to-b from-transparent via-purple-500/10 to-transparent"></div>
                  </div>
            
            {/* Enhanced Code-like Elements */}
            <div className="absolute top-1/4 left-[15%] text-blue-500/5 font-mono text-sm whitespace-nowrap rotate-6 animate-float-slow">
              &lt;encryption&gt;secure_mail&lt;/encryption&gt;
                  </div>
            <div className="absolute bottom-1/3 right-[15%] text-purple-500/5 font-mono text-sm whitespace-nowrap -rotate-6 animate-float-slow" style={{ animationDelay: '1.5s' }}>
              {'{privacy: "enabled"}'}
                </div>
                
            {/* Enhanced Floating Particles */}
            <div className="absolute inset-0">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className={`absolute rounded-full ${
                    i % 3 === 0 ? 'w-1 h-1 bg-blue-500/30' :
                    i % 3 === 1 ? 'w-2 h-2 bg-purple-500/20' :
                    'w-1.5 h-1.5 bg-blue-400/25'
                  }`}
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 3}s`
                  }}
                ></div>
              ))}
                </div>

            {/* Glowing Orbs */}
            <div className="absolute top-1/4 right-1/3 w-4 h-4">
              <div className="absolute inset-0 bg-blue-400 rounded-full blur-sm animate-glow"></div>
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm animate-ping"></div>
              </div>
            <div className="absolute bottom-1/3 left-1/4 w-4 h-4">
              <div className="absolute inset-0 bg-purple-400 rounded-full blur-sm animate-glow"></div>
              <div className="absolute inset-0 bg-purple-500 rounded-full blur-sm animate-ping" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ opacity }}
            className="max-w-4xl mx-auto text-center relative"
          >
            <div className="inline-block mb-4 px-4 py-2 bg-blue-500/10 rounded-full text-blue-400 text-sm font-medium border border-blue-500/20">
              Güvenli ve Gizlilik Odaklı E-posta Deneyimi
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white text-transparent bg-clip-text leading-tight">
              E-postanın geleceği<br />burada başlıyor.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              PiMail ile e-postayı istediğiniz şekilde deneyimleyin — 
              <span className="text-blue-400 font-medium"> gizliliğinizi ve güvenliğinizi </span> 
              ön planda tutan ilk açık kaynaklı e-posta uygulaması.
            </p>

            {/* Email Signup - Optimize edilmiş */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center mb-10"
            >
              <form onSubmit={handleSubmit} className="relative w-full max-w-md mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20"></div>
                <div className="relative flex items-center bg-gray-900/80 border border-gray-800 rounded-lg backdrop-blur-sm overflow-hidden">
                  <input 
                    type="email" 
                    placeholder="ad@pii.email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-4 py-4 bg-transparent border-0 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
                  />
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-sm font-medium transition-all rounded-r-lg flex items-center gap-2 group disabled:opacity-50"
                  >
                    <span>{isLoading ? 'Kaydediliyor...' : 'Katıl'}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
                {error && (
                  <div className="absolute -bottom-6 left-0 right-0 text-center text-red-400 text-sm">
                    {error}
                  </div>
                )}
              </form>
              <p className="text-gray-400 text-sm flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span><span className="font-semibold text-white">{waitlistCount}+</span> kişi bekleme listesine katıldı</span>
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Email Preview Section */}
        <Suspense fallback={<div className="h-[450px] animate-pulse bg-gray-900/50 rounded-xl" />}>
          <EmailPreview />
        </Suspense>

        {/* Features Section */}
        <Suspense fallback={<div className="h-96 animate-pulse bg-gray-900/50 rounded-xl" />}>
          <Features />
        </Suspense>

        {/* FAQ Section */}
        <Suspense fallback={<div className="h-96 animate-pulse bg-gray-900/50 rounded-xl" />}>
          <FAQ />
        </Suspense>
      </main>

      <Footer />

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500/90 text-white px-6 py-3 rounded-lg shadow-lg backdrop-blur-sm z-50 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Teşekkürler! Bekleme listesinde yeriniz hazır.</span>
        </div>
      )}

      {/* Error Notification */}
      {error && !showSuccess && (
        <div className="fixed bottom-4 right-4 bg-red-500/90 text-white px-6 py-3 rounded-lg shadow-lg backdrop-blur-sm z-50 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 00-1.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-10px) translateX(5px);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) rotate(var(--tw-rotate));
            opacity: 0.1;
          }
          50% {
            transform: translateY(-10px) rotate(var(--tw-rotate));
            opacity: 0.15;
          }
        }

        @keyframes glow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }

        @keyframes gradient-shift {
          0%, 100% {
            opacity: 0.2;
            transform: translateY(0);
          }
          50% {
            opacity: 0.4;
            transform: translateY(20px);
          }
        }
      `}</style>
    </motion.div>
  );
}
