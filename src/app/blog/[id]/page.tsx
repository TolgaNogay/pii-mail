'use client';
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/ui/Footer";
import { useParams } from "next/navigation";
import Image from "next/image";

// TypeScript interface for blog post data
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  authorBio: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

// Sample blog data (normally this would come from an API/database)
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "E-posta İletişiminde Güvenlik İçin 10 Altın Kural",
    excerpt: "Günümüzde e-posta iletişimini güvenli tutmak için bilmeniz gereken en önemli güvenlik uygulamaları ve ipuçları.",
    content: `
      <p>E-posta, günlük iletişimimizin vazgeçilmez bir parçası haline geldi. Ancak bu yaygın kullanım, beraberinde güvenlik risklerini de getiriyor. İşte e-posta iletişiminizi güvende tutmak için uygulamanız gereken 10 altın kural:</p>

      <h2>1. Güçlü Şifre Kullanın</h2>
      <p>E-posta hesabınız için en az 12 karakter uzunluğunda, büyük-küçük harf, rakam ve özel karakterler içeren güçlü bir şifre oluşturun. Şifrenizi düzenli olarak değiştirin ve farklı hesaplar için aynı şifreyi kullanmaktan kaçının.</p>

      <h2>2. İki Faktörlü Doğrulama (2FA) Kullanın</h2>
      <p>Hesabınıza ekstra bir güvenlik katmanı eklemek için iki faktörlü doğrulamayı aktif hale getirin. Bu sayede şifreniz ele geçirilse bile hesabınız korunmuş olur.</p>

      <h2>3. Şüpheli E-postalara Dikkat Edin</h2>
      <p>Tanımadığınız kaynaklardan gelen e-postalardaki bağlantılara tıklamayın ve ekleri açmayın. Özellikle bankacılık ve finansal işlemlerle ilgili e-postalara karşı dikkatli olun.</p>

      <h2>4. E-posta Şifreleme Kullanın</h2>
      <p>Hassas bilgiler içeren e-postalarınızı uçtan uca şifreleme ile gönderin. PiMail'in sunduğu şifreleme özellikleri ile e-postalarınız güvende kalır.</p>

      <h2>5. Güvenli Ağlar Kullanın</h2>
      <p>Halka açık Wi-Fi ağlarında e-posta işlemlerinizi yapmaktan kaçının. Eğer kullanmanız gerekiyorsa, mutlaka VPN kullanın.</p>

      <h2>6. E-posta İstemcinizi Güncel Tutun</h2>
      <p>Kullandığınız e-posta istemcisinin ve işletim sisteminizin güncel olduğundan emin olun. Güncellemeler genellikle önemli güvenlik yamalarını içerir.</p>

      <h2>7. Spam Filtreleri Kullanın</h2>
      <p>Spam e-postaları engellemek için güçlü spam filtreleri kullanın. PiMail'in gelişmiş spam filtreleme sistemi, istenmeyen e-postaları otomatik olarak engeller.</p>

      <h2>8. Yedekleme Yapın</h2>
      <p>Önemli e-postalarınızı ve eklerini düzenli olarak yedekleyin. Bu sayede olası bir güvenlik ihlali durumunda verileriniz güvende kalır.</p>

      <h2>9. Gizlilik Ayarlarını Kontrol Edin</h2>
      <p>E-posta hesabınızın gizlilik ayarlarını düzenli olarak gözden geçirin ve gereksiz izinleri kaldırın.</p>

      <h2>10. Güvenlik Eğitimi Alın</h2>
      <p>Kendinizi ve ekibinizi e-posta güvenliği konusunda sürekli eğitin. Güncel tehditler ve korunma yöntemleri hakkında bilgi sahibi olun.</p>

      <h3>Sonuç</h3>
      <p>Bu güvenlik kurallarını uygulayarak e-posta iletişiminizi çok daha güvenli hale getirebilirsiniz. PiMail olarak, kullanıcılarımızın güvenliğini en üst düzeyde tutmak için sürekli yeni özellikler ve güncellemeler sunuyoruz.</p>
    `,
    category: "Güvenlik",
    author: "Ahmet Yılmaz",
    authorRole: "Güvenlik Uzmanı",
    authorBio: "10+ yıllık siber güvenlik deneyimine sahip, CISSP sertifikalı güvenlik uzmanı. E-posta güvenliği ve veri koruma konularında uzmanlaşmış.",
    authorAvatar: "/avatars/ahmet.jpg",
    date: "15 Mart 2025",
    readTime: "7 dk",
    image: "/blog/email-security.jpg",
    tags: ["güvenlik", "e-posta", "ipuçları"]
  }
];

// Get related posts (excluding current post)
const getRelatedPosts = (currentPost: BlogPost): BlogPost[] => {
  return blogPosts
    .filter(post => post.id !== currentPost.id)
    .filter(post => 
      post.category === currentPost.category || 
      post.tags.some(tag => currentPost.tags.includes(tag))
    )
    .slice(0, 3);
};

export default function BlogPostPage() {
  const params = useParams();
  const post = blogPosts.find(post => post.id === Number(params.id));

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog yazısı bulunamadı</h1>
          <Link href="/blog" className="text-blue-400 hover:text-blue-300">
            Blog ana sayfasına dön
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post);

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
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link 
              href="/blog"
              className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-6 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Blog'a Dön
            </Link>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-600/90 rounded-full text-xs font-medium">
                  {post.category}
                </span>
                <span className="text-gray-400 text-sm">•</span>
                <span className="text-gray-400 text-sm">{post.readTime}</span>
                <span className="text-gray-400 text-sm">•</span>
                <span className="text-gray-400 text-sm">{post.date}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-white text-transparent bg-clip-text leading-tight">
                {post.title}
              </h1>
            </div>
          </motion.div>

          {/* Post Featured Image */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-10 rounded-xl overflow-hidden relative"
          >
            <div className="aspect-[16/9] bg-gray-800 relative">
              {/* Actual image */}
              <Image 
                src="/blog/email-security.jpg" 
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              
              {/* Overlay gradient for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
              
              {/* Image caption */}
              <div className="absolute bottom-4 left-4 right-4 text-white text-sm">
                <p className="font-medium">E-posta güvenliği için kritik önlemler almanız gerekiyor</p>
              </div>
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-16"
            >
              <h2 className="text-2xl font-bold mb-8">İlgili Yazılar</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.id}`}
                    className="block group"
                  >
                    <div className="bg-gray-900/50 backdrop-blur-md rounded-xl border border-gray-800 overflow-hidden hover:border-blue-500/30 transition-all">
                      <div className="relative h-40 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/60 z-10"></div>
                        <div className="h-full w-full bg-gray-800 animate-pulse"></div>
                        <div className="absolute top-4 left-4 z-20">
                          <span className="px-3 py-1 bg-blue-600/90 rounded-full text-xs font-medium">
                            {relatedPost.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
} 