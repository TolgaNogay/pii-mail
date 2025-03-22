'use client';
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/ui/Footer";
import { useState } from "react";

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "E-posta İletişiminde Güvenlik İçin 10 Altın Kural",
    excerpt: "Günümüzde e-posta iletişimini güvenli tutmak için bilmeniz gereken en önemli güvenlik uygulamaları ve ipuçları.",
    category: "Güvenlik",
    author: "Ahmet Yılmaz",
    authorRole: "Güvenlik Uzmanı",
    authorAvatar: "/avatars/ahmet.jpg",
    date: "15 Mart 2025",
    readTime: "7 dk",
    image: "/blog/email-security.jpg",
    tags: ["güvenlik", "e-posta", "ipuçları"]
  },
  {
    id: 2,
    title: "PiMail'in Yeni Özellikleri: 2025 Güncellemeleri",
    excerpt: "PiMail'in 2025 yılında sunduğu yeni özellikler ve kullanıcı deneyimini nasıl iyileştirdiğimiz hakkında detaylı bilgiler.",
    category: "Ürün",
    author: "Zeynep Kaya",
    authorRole: "Ürün Yöneticisi",
    authorAvatar: "/avatars/zeynep.jpg",
    date: "2 Mart 2025",
    readTime: "5 dk",
    image: "/blog/new-features.jpg",
    tags: ["özellikler", "güncelleme", "ürün"]
  },
  {
    id: 3,
    title: "E-posta Verimliliğini Artırmanın 5 Yolu",
    excerpt: "Gelen kutunuzu etkili bir şekilde yönetmek ve e-posta verimliliğinizi artırmak için kullanabileceğiniz stratejiler.",
    category: "Verimlilik",
    author: "Can Demir",
    authorRole: "İçerik Stratejisti",
    authorAvatar: "/avatars/can.jpg",
    date: "20 Şubat 2025",
    readTime: "4 dk",
    image: "/blog/email-productivity.jpg",
    tags: ["verimlilik", "ipuçları", "gelen kutusu"]
  },
  {
    id: 4,
    title: "Açık Kaynak E-posta Sistemlerinin Avantajları",
    excerpt: "Açık kaynak e-posta sistemlerinin sağladığı faydalar ve neden şirketlerin bu sistemleri tercih etmesi gerektiği.",
    category: "Teknoloji",
    author: "Deniz Yıldız",
    authorRole: "Yazılım Mühendisi",
    authorAvatar: "/avatars/deniz.jpg",
    date: "10 Şubat 2025",
    readTime: "6 dk",
    image: "/blog/open-source.jpg",
    tags: ["açık kaynak", "teknoloji", "e-posta"]
  },
  {
    id: 5,
    title: "E-posta Pazarlaması İçin En İyi Uygulamalar 2025",
    excerpt: "2025 yılında e-posta pazarlaması stratejinizi geliştirmek için kullanabileceğiniz en iyi uygulamalar ve trendler.",
    category: "Pazarlama",
    author: "Ece Aydın",
    authorRole: "Dijital Pazarlama Uzmanı",
    authorAvatar: "/avatars/ece.jpg",
    date: "1 Şubat 2025",
    readTime: "8 dk",
    image: "/blog/email-marketing.jpg",
    tags: ["pazarlama", "strateji", "e-posta"]
  },
  {
    id: 6,
    title: "Uçtan Uca Şifreleme Nedir ve Neden Önemli?",
    excerpt: "Uçtan uca şifrelemenin e-posta iletişimindeki önemi ve PiMail'in bu konudaki yaklaşımı.",
    category: "Güvenlik",
    author: "Ali Tekin",
    authorRole: "Kriptografi Uzmanı",
    authorAvatar: "/avatars/ali.jpg",
    date: "15 Ocak 2025",
    readTime: "9 dk",
    image: "/blog/encryption.jpg",
    tags: ["şifreleme", "güvenlik", "teknoloji"]
  },
];

// Available categories for filtering
const categories = [
  "Tümü",
  "Güvenlik",
  "Ürün",
  "Verimlilik",
  "Teknoloji",
  "Pazarlama"
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts based on selected category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "Tümü" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12 relative z-10">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-white text-transparent bg-clip-text">Blog</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            E-posta güvenliği, verimliliği ve PiMail ile ilgili en güncel bilgi ve ipuçları
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800/60 text-gray-300 hover:bg-gray-700/60"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * post.id }}
                className="bg-gray-900/50 backdrop-blur-md rounded-xl border border-gray-800 overflow-hidden hover:border-blue-500/30 transition-all group"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/60 z-10"></div>
                  <div className="h-full w-full bg-gray-800 animate-pulse"></div>
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-blue-600/90 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors line-clamp-2 h-14">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h2>
                  <p className="text-gray-400 mb-4 text-sm line-clamp-3 h-16">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                        {post.author.charAt(0)}
                      </div>
                      <div className="min-w-0 max-w-[120px]">
                        <p className="text-sm font-medium text-white truncate">
                          {post.author}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{post.authorRole}</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-2 flex-shrink-0">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-gray-600 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-bold text-gray-300 mb-2">
              Aradığınız kriterlere uygun blog yazısı bulunamadı
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Lütfen farklı bir arama terimi deneyin veya filtreyi temizleyin.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("Tümü");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition-colors"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-8 md:p-12 rounded-xl border border-blue-800/30 backdrop-blur-md"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-purple-300 text-transparent bg-clip-text">
              En son blog yazılarımızdan haberdar olun
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              E-posta bültenimize abone olun ve en son içeriklerimizden, ipuçlarından ve güncellemelerden haberdar olun.
            </p>
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20"></div>
              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="w-full px-4 py-3 bg-gray-900/80 border border-gray-800 rounded-l-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-r-lg text-white font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 whitespace-nowrap flex-shrink-0">
                  Abone Ol
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
} 