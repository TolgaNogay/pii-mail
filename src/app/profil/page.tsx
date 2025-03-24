'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Person, ArrowBack, Mail, Phone, CalendarMonth } from '@mui/icons-material';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [userData, setUserData] = useState({ 
    firstName: '',
    lastName: '',
    email: '',
    bio: 'Merhaba! Ben PiiMail kullanıcısıyım.',
    location: 'İstanbul, Türkiye',
    phone: '+90 --- --- -- --',
    joinDate: '',
    avatarUrl: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [storageUsage, setStorageUsage] = useState({
    used: 0,
    total: 200 * 1024 * 1024 // 200 MB
  });
  const [recentActivities, setRecentActivities] = useState([
    {
      type: 'email_sent',
      title: 'Yeni e-posta gönderildi',
      description: 'recipient@example.com adresine bir e-posta gönderdiniz',
      time: '2 saat önce'
    },
    {
      type: 'profile_updated',
      title: 'Profil güncellendi',
      description: 'Profil bilgilerinizi güncellediniz',
      time: '1 gün önce'
    },
    {
      type: 'folder_created',
      title: 'Yeni klasör oluşturuldu',
      description: '"Proje Belgeleri" klasörü oluşturuldu',
      time: '3 gün önce'
    }
  ]);
  
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user && !isRedirecting) {
        setIsRedirecting(true);
        setTimeout(() => {
          window.location.href = '/giris';
        }, 100);
      } else if (user) {
        // Kullanıcı e-postasını kaydet
        setUserData(prev => ({ ...prev, email: user.email || '' }));
        console.log("ProfilePage - Kullanıcı oturumu doğrulandı, id:", user.id);
        
        // Profil bilgilerini çek
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('first_name, last_name, avatar_url')
          .eq('id', user.id)
          .single();
        
        if (profileError) {
          console.error('ProfilePage - Profil bilgileri alınırken hata:', profileError.message);
        } else if (profile) {
          // Katılma tarihini hesapla
          const createdAt = user.created_at;
          const joinDate = createdAt ? formatJoinDate(createdAt) : 'Bilinmiyor';
          
          setUserData(prev => ({
            ...prev,
            firstName: profile.first_name || '',
            lastName: profile.last_name || '',
            avatarUrl: profile.avatar_url || '',
            joinDate
          }));
        }
        
        // Depolama kullanımını hesapla
        calculateStorageUsage(user.id);
      }
    } catch (error) {
      console.error("ProfilePage - Oturum kontrolü sırasında hata:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStorageUsage = async (userId: string) => {
    try {
      // Kullanıcının tüm dosyalarını al
      const { data: files, error } = await supabase
        .storage
        .from('avatars')
        .list(userId);
      
      if (error) throw error;
      
      // Toplam boyutu hesapla
      const totalSize = files?.reduce((acc, file) => acc + (file.metadata?.size || 0), 0) || 0;
      
      setStorageUsage(prev => ({
        ...prev,
        used: totalSize
      }));
    } catch (error) {
      console.error('Depolama kullanımı hesaplanırken hata:', error);
    }
  };

  // Katılma tarihini formatla
  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    return new Intl.DateTimeFormat('tr-TR', options).format(date);
  };

  // Kullanıcı avatarını almak için fonksiyon
  const getUserAvatar = () => {
    if (userData.avatarUrl) {
      return userData.avatarUrl;
    }
    return `https://api.dicebear.com/7.x/micah/svg?seed=${encodeURIComponent(userData.firstName || userData.email || 'Kullanıcı')}&radius=50&backgroundColor=2563eb`;
  };

  // Depolama kullanımını formatla
  const formatStorageSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-800 rounded-xl mb-20"></div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-800 rounded w-1/4"></div>
              <div className="h-4 bg-gray-800 rounded w-1/2"></div>
              <div className="h-4 bg-gray-800 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()} 
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowBack />
            </button>
            <h1 className="text-2xl font-bold flex items-center">
              <Person className="mr-2" fontSize="large" /> Profil
            </h1>
          </div>
          <div>
            <Link href="/ayarlar" className="px-4 py-2 bg-gray-800/60 hover:bg-gray-800/80 rounded-lg flex items-center text-gray-300 hover:text-white transition-colors border border-gray-700/60">
              Ayarlar
            </Link>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - User Info */}
          <div className="md:col-span-1">
            <div className="bg-gray-900/50 rounded-lg border border-gray-800/50 overflow-hidden shadow-lg">
              {/* Banner and Profile image */}
              <div className="relative">
                {/* Banner */}
                <div className="h-40 relative overflow-hidden">
                  {/* Gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30"></div>
                  
                  {/* Pattern overlay */}
                  <div className="absolute inset-0 bg-[url('/banner-pattern.svg')] opacity-40"></div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                </div>
                
                {/* Profile image overlaying the banner */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 rounded-full"></div>
                    <div className="w-32 h-32 rounded-full border-4 border-gray-800/80 bg-gradient-to-br from-blue-500 to-blue-700 shadow-xl shadow-blue-900/30 overflow-hidden relative">
                      <img 
                        src={getUserAvatar()}
                        alt={userData.firstName || 'Kullanıcı'} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 mt-16">
                <h2 className="text-xl font-semibold mb-4 text-center">{userData.firstName} {userData.lastName}</h2>
                <p className="text-gray-400 mb-6 text-center">{userData.bio}</p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">E-posta</p>
                      <p>{userData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Telefon</p>
                      <p>{userData.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-300">
                    <CalendarMonth className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Katılma Tarihi</p>
                      <p>{userData.joinDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Activities & Storage */}
          <div className="md:col-span-2">
            {/* Recent Activities */}
            <div className="bg-gray-900/50 rounded-lg border border-gray-800/50 overflow-hidden shadow-lg mb-8">
              <div className="p-4 border-b border-gray-800/50 flex justify-between items-center">
                <h3 className="font-semibold">Son Aktiviteler</h3>
                <button className="text-blue-400 text-sm hover:text-blue-300">Tümünü Gör</button>
              </div>
              
              <div className="p-4">
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex p-3 bg-gray-800/30 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center mr-3">
                        <Mail className="text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-gray-400 mt-1">{activity.description}</p>
                          </div>
                          <span className="text-sm text-gray-500">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Storage Usage */}
            <div className="bg-gray-900/50 rounded-lg border border-gray-800/50 overflow-hidden shadow-lg">
              <div className="p-4 border-b border-gray-800/50">
                <h3 className="font-semibold">Depolama Kullanımı</h3>
              </div>
              
              <div className="p-4">
                <div className="mb-2 flex justify-between items-center">
                  <span className="text-sm text-gray-400">Kullanılan Alan</span>
                  <span className="text-sm">
                    {formatStorageSize(storageUsage.used)} / {formatStorageSize(storageUsage.total)}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(storageUsage.used / storageUsage.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 