'use client';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/ui/Footer";
import { NextSeo } from "next-seo";
import { lazy, Suspense } from "react";

// Lazy loading için bileşenleri tanımlıyorum
const LazyFeatures = lazy(() => import("../components/home/Features"));
const LazyEmailPreview = lazy(() => import("../components/home/EmailPreview"));

export default function Home() {
  return (
    <>
      <NextSeo
        title="Pii.Mail — Gizlilik, Hız, Güven"
        description="Modern, güvenli ve kullanıcı dostu e-posta deneyimi. Gizliliğinizi ve güvenliğinizi ön planda tutan açık kaynaklı e-posta çözümü."
        canonical="https://pii.email"
        openGraph={{
          url: "https://pii.email",
          title: "Pii.Mail — Gizlilik, Hız, Güven",
          description: "Modern, güvenli ve kullanıcı dostu e-posta deneyimi. Gizliliğinizi ve güvenliğinizi ön planda tutan açık kaynaklı e-posta çözümü.",
          images: [
            {
              url: "https://pii.email/images/og-image.jpg",
              width: 1200,
              height: 630,
              alt: "Pii.Mail",
            },
          ],
        }}
      />
      
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
                <Image 
                  src="/images/logo.svg" 
                  alt="Pii.Mail Logo" 
                  width={28} 
                  height={28} 
                  className="relative z-10"
                  priority
                />
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
              <Link 
                href="/iletisim" 
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all text-sm shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
              >
                İletişime Geçin
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-2 px-3 py-1 bg-blue-500/10 rounded-full text-blue-400 text-sm font-medium border border-blue-500/20">
              beta sürümü yakında.
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-5 bg-gradient-to-r from-white via-blue-100 to-white text-transparent bg-clip-text leading-tight">
              E-postanın geleceği burada.
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              PiMail ile e-postayı istediğiniz şekilde deneyimleyin — gizliliğinizi ve güvenliğinizi ön planda tutan ilk açık kaynaklı e-posta uygulaması.
            </p>
            
            <div className="flex flex-col items-center mb-10">
              <div className="relative w-full max-w-sm mb-2">
                <div className="relative flex items-center bg-gray-900 border border-gray-800 rounded-lg">
                  <input 
                    type="email" 
                    placeholder="ad@pii.email" 
                    className="w-full px-3 py-3 bg-transparent border-0 rounded-l-lg text-white placeholder-gray-500 focus:outline-none focus:ring-0"
                  />
                  <button className="px-4 py-3 bg-blue-600 hover:bg-blue-500 transition-all rounded-r-lg text-white text-sm font-medium">
                    Katıl
                  </button>
                </div>
              </div>
              <p className="text-gray-400 text-sm flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <span><span className="font-semibold text-white">15+</span> kişi bekleme listesine katıldı.</span>
              </p>
            </div>
          </div>
          
          {/* Lazy Loaded Email Preview */}
          <Suspense fallback={<div className="w-full max-w-5xl mt-8 h-[450px] bg-gray-900/50 rounded-lg border border-gray-800 animate-pulse"></div>}>
            <LazyEmailPreview />
          </Suspense>
          
          {/* Lazy Loaded Features Section */}
          <Suspense fallback={<div className="w-full max-w-6xl mt-24 mb-16 h-[600px] bg-gray-900/50 rounded-lg border border-gray-800 animate-pulse"></div>}>
            <LazyFeatures />
          </Suspense>
        </main>

        {/* Footer */}
        <Footer />
      </motion.div>
    </>
  );
}
