'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Person, ArrowBack, Settings, Edit, Camera, Mail, Phone, CalendarMonth, CloudUpload } from '@mui/icons-material';

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [userData, setUserData] = useState({ 
    firstName: '',
    lastName: '',
    bio: 'Merhaba! Ben PiiMail kullanıcısıyım.',
    location: 'İstanbul, Türkiye',
    phone: '+90 555 123 45 67',
    website: 'website.com',
    joinDate: 'Mart 2023'
  });
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
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
        setUserEmail(user.email || '');
        
        // Kullanıcı adı ve e-posta bilgisini kullan
        const userEmail = user.email || '';
        let firstName = 'Kullanıcı';
        let lastName = '';
        
        // E-postadan ad-soyad tahmin et (basit yaklaşım)
        if (userEmail) {
          const emailName = userEmail.split('@')[0];
          const nameParts = emailName
            .replace(/[0-9]/g, '') // Rakamları kaldır
            .replace(/[._-]/g, ' ') // Nokta, alt çizgi ve tire işaretlerini boşluğa çevir
            .trim()
            .split(' ');
          
          if (nameParts.length > 0) {
            firstName = nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1).toLowerCase();
            
            if (nameParts.length > 1) {
              lastName = nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1).toLowerCase();
            }
          }
        }
        
        setUserData({
          ...userData,
          firstName,
          lastName
        });
        
        // Ayrıca profil tablosundan bilgileri de almaya çalış
        fetchUserData(user.id);
      }
    } catch (error) {
      console.error("Oturum kontrolü sırasında hata:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserData = async (userId: string) => {
    try {
      // Önce user tablosunu kontrol et
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('first_name, last_name')
        .eq('id', userId)
        .single();
      
      if (!userError && userData && userData.first_name) {
        console.log('Users tablosundan kullanıcı verileri alındı:', userData);
        setUserData(prevData => ({
          ...prevData,
          firstName: userData.first_name,
          lastName: userData.last_name || ''
        }));
        return;
      }
      
      // Eğer user tablosunda bilgi bulunamazsa, profiles tablosunu kontrol et
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', userId)
        .single();
      
      if (!profileError && profileData && profileData.full_name) {
        console.log('Profiles tablosundan kullanıcı verileri alındı:', profileData);
        const nameParts = profileData.full_name.split(' ');
        setUserData(prevData => ({
          ...prevData,
          firstName: nameParts[0] || 'Kullanıcı',
          lastName: nameParts.slice(1).join(' ') || ''
        }));
      }
    } catch (error) {
      console.error('Kullanıcı bilgileri alınırken beklenmeyen hata:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="w-12 h-12 border-4 border-t-blue-500 border-r-blue-400 border-blue-300/30 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 min-h-screen text-white font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button 
            className="p-2 mr-3 bg-gray-800/50 hover:bg-gray-800/80 rounded-full transition-colors"
            onClick={() => router.push('/gelenkutusu')}
          >
            <ArrowBack />
          </button>
          <h1 className="text-2xl font-bold flex items-center">
            <Person className="mr-2" fontSize="large" /> Profil
          </h1>
          <div className="ml-auto">
            <button 
              className="px-4 py-2 rounded-lg flex items-center bg-gray-800/50 hover:bg-gray-800/80 transition-colors"
              onClick={() => router.push('/ayarlar')}
            >
              <Settings className="mr-2" fontSize="small" />
              Ayarlar
            </button>
          </div>
        </div>

        {/* Profile Banner */}
        <div className="relative w-full h-48 md:h-64 rounded-t-xl bg-gradient-to-r from-blue-900/40 to-purple-900/40 overflow-hidden mb-16 md:mb-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm"></div>
          
          <button className="absolute right-4 top-4 p-2 bg-gray-900/50 rounded-full hover:bg-gray-900/70 transition-colors">
            <Edit />
          </button>
          
          {/* Profile Picture */}
          <div className="absolute -bottom-14 left-8 md:left-12">
            <div className="relative">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden border-4 border-gray-900 shadow-xl">
                <img 
                  src={`https://i.pravatar.cc/144?u=${userData.firstName}`} 
                  alt={`${userData.firstName} ${userData.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute right-1 bottom-1 p-2 bg-gray-900/70 rounded-full hover:bg-gray-900 transition-colors border border-gray-700">
                <Camera fontSize="small" />
              </button>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column */}
          <div className="w-full md:w-1/3">
            <div className="bg-gray-900/50 rounded-lg border border-gray-800/50 overflow-hidden shadow-lg">
              <div className="p-6">
                <h2 className="text-2xl font-bold">{userData.firstName} {userData.lastName}</h2>
                <p className="text-gray-400 mt-1 flex items-center">
                  <Mail fontSize="small" className="mr-1" /> {userEmail}
                </p>
                
                <div className="mt-4 text-gray-300">
                  {userData.bio}
                </div>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-start">
                    <CalendarMonth className="text-gray-400 mr-2 mt-0.5" fontSize="small" />
                    <div>
                      <p className="text-sm text-gray-400">Katılma Tarihi</p>
                      <p>{userData.joinDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="text-gray-400 mr-2 mt-0.5" fontSize="small" />
                    <div>
                      <p className="text-sm text-gray-400">Telefon</p>
                      <p>{userData.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1">
            {/* Activity Section */}
            <div className="bg-gray-900/50 rounded-lg border border-gray-800/50 overflow-hidden shadow-lg mb-6">
              <div className="p-4 border-b border-gray-800/50 flex justify-between items-center">
                <h3 className="font-semibold">Son Aktiviteler</h3>
                <button className="text-blue-400 text-sm hover:text-blue-300">Tümünü Gör</button>
              </div>
              
              <div className="p-4">
                <div className="space-y-4">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="flex p-3 bg-gray-800/30 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center mr-3">
                        <Mail className="text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{index === 0 ? 'Yeni e-posta gönderildi' : index === 1 ? 'Profil güncellendi' : 'Yeni klasör oluşturuldu'}</p>
                            <p className="text-sm text-gray-400 mt-1">
                              {index === 0 
                                ? 'recipient@example.com adresine bir e-posta gönderdiniz' 
                                : index === 1 
                                  ? 'Profil bilgilerinizi güncellediniz' 
                                  : '"Proje Belgeleri" klasörü oluşturuldu'}
                            </p>
                          </div>
                          <span className="text-xs text-gray-500">{index === 0 ? '2 saat önce' : index === 1 ? '1 gün önce' : '3 gün önce'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Storage Section */}
            <div className="bg-gray-900/50 rounded-lg border border-gray-800/50 overflow-hidden shadow-lg">
              <div className="p-4 border-b border-gray-800/50">
                <h3 className="font-semibold">Depolama Kullanımı</h3>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Kullanılan Alan</span>
                  <span className="text-sm font-medium">10.06 MB / 200 MB</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{width: '5%'}}></div>
                </div>
                
                <div className="mt-6">
                  <div className="flex items-center justify-between py-3 border-b border-gray-800/50">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-md bg-blue-900/30 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                          <polyline points="13 2 13 9 20 9"></polyline>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Belgeler</p>
                        <p className="text-sm text-gray-400">24 dosya</p>
                      </div>
                    </div>
                    <span className="text-gray-400">4.2 MB</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-gray-800/50">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-md bg-green-900/30 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Görseller</p>
                        <p className="text-sm text-gray-400">36 dosya</p>
                      </div>
                    </div>
                    <span className="text-gray-400">3.8 MB</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-md bg-purple-900/30 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <path d="M10 12a2 2 0 1 0 4 0 2 2 0 1 0-4 0"></path>
                          <path d="M12 14v4"></path>
                          <path d="M8 16h8"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Diğer</p>
                        <p className="text-sm text-gray-400">12 dosya</p>
                      </div>
                    </div>
                    <span className="text-gray-400">2.1 MB</span>
                  </div>
                </div>
                
                <button className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-colors">
                  <CloudUpload className="mr-2" fontSize="small" />
                  Dosya Yükle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 