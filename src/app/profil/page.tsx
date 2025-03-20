'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Person, ArrowBack, Settings, Edit, Camera, Mail, Phone, CalendarMonth, CloudUpload, CalendarToday, LocationOn, Link, Storage } from '@mui/icons-material';
import Image from 'next/image';

// Update the user interface to match the new database schema
interface User {
  id: string;
  email: string;
  created_at: string;
  role: string;
  storage_size: number;
  avatar_url?: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  location?: string;
  phone?: string;
  website?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [loading, setLoading] = useState(true);
  // Update userdata state to match new interface
  const [userData, setUserData] = useState<User>({
    id: '',
    email: '',
    created_at: '',
    role: 'user',
    storage_size: 0,
    first_name: '',
    last_name: '',
    bio: '',
    location: '',
    phone: '',
    website: ''
  });
  const [joinDate, setJoinDate] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user && !isRedirecting) {
        setIsRedirecting(true);
        setTimeout(() => {
          router.push('/giris');
        }, 100);
      } else if (user) {
        // User verilerini alırken başlangıç değerleri ata
        setUserData(prevData => ({
          ...prevData,
          id: user.id,
          email: user.email || '',
          created_at: user.created_at || new Date().toISOString()
        }));
        
        // Kayıt tarihini formatla
        if (user.created_at) {
          formatJoinDate(user.created_at);
        }
        
        // User verilerini veritabanından al
        fetchUserData(user.id);
      }
    } catch (error) {
      console.error('Oturum kontrolü sırasında hata:', error);
    }
  };

  // Kayıt tarihini formatlama fonksiyonu
  const formatJoinDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const formattedDate = date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      setJoinDate(formattedDate);
    } catch (error) {
      console.error('Tarih formatlanırken hata oluştu:', error);
      setJoinDate('Bilinmiyor');
    }
  };

  const fetchUserData = async (userId: string) => {
    try {
      setLoading(true);
      
      // User tablosundan kullanıcı verilerini al
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('first_name, last_name, created_at, role, storage_size, avatar_url, bio, location, phone, website')
        .eq('id', userId)
        .single();
      
      if (!userError && userData) {
        console.log('Users tablosundan kullanıcı verileri alındı:', userData);
        
        // Kullanıcı verilerini güncelle
        setUserData(prevData => ({
          ...prevData,
          first_name: userData.first_name || '',
          last_name: userData.last_name || '',
          created_at: userData.created_at || prevData.created_at,
          role: userData.role || 'user',
          storage_size: userData.storage_size || 0,
          avatar_url: userData.avatar_url,
          bio: userData.bio || '',
          location: userData.location || '',
          phone: userData.phone || '',
          website: userData.website || ''
        }));
        
        // Kayıt tarihini formatla
        if (userData.created_at) {
          formatJoinDate(userData.created_at);
        }
        
        // Avatar URL'ini ayarla
        if (userData.avatar_url) {
          setAvatarUrl(userData.avatar_url);
        } else {
          // Avatar yoksa, isim baş harflerini kullanarak avatar oluştur
          const name = `${userData.first_name || ''} ${userData.last_name || ''}`.trim();
          setAvatarUrl(getAvatarUrl(name, userData.email || ''));
        }
      } else {
        // Varsayılan avatar oluştur
        setAvatarUrl(getAvatarUrl('', userData?.email || ''));
      }
    } catch (error) {
      console.error('Kullanıcı bilgileri alınırken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  // Avatar URL oluşturma fonksiyonu
  const getAvatarUrl = (name: string, email: string) => {
    if (name && name.trim() !== '') {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff&size=256`;
    } else if (email) {
      // E-posta adresinden kullanıcı adını al
      const username = email.split('@')[0];
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=0D8ABC&color=fff&size=256`;
    }
    return `https://ui-avatars.com/api/?name=?&background=0D8ABC&color=fff&size=256`;
  };

  if (loading) {
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
        <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-xl mb-6 overflow-hidden border border-gray-800/70 backdrop-blur-sm shadow-xl">
          <div className="h-32 md:h-48 bg-gradient-to-r from-blue-900/30 to-purple-900/30 relative">
            <div className="absolute left-0 right-0 -bottom-16 md:-bottom-20 flex justify-center">
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md"></div>
                <div className="relative z-10 w-full h-full rounded-full border-4 border-gray-900 shadow-xl overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700">
                  {avatarUrl ? (
                    <img 
                      src={avatarUrl} 
                      alt={userData.first_name || 'Profil'} 
                      className="w-full h-full object-cover"
                    />
                  ) : loading ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                      <div className="w-10 h-10 border-4 border-t-blue-500 border-r-blue-300 border-blue-100/30 rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl font-bold">
                      {userData.first_name?.charAt(0) || userData.email?.charAt(0).toUpperCase() || '?'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-20 pb-6 px-4 md:px-8 text-center">
            <h2 className="text-2xl font-bold mb-1">
              {userData.first_name} {userData.last_name}
            </h2>
            <div className="text-gray-400 mb-4">{userData.email}</div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 max-w-lg mx-auto mb-2">
              <div className="flex items-center">
                <CalendarToday fontSize="small" className="mr-1 text-gray-500" />
                <span>Katılma: {joinDate || 'Yükleniyor...'}</span>
              </div>
              {userData.phone && (
                <div className="flex items-center">
                  <Phone fontSize="small" className="mr-1 text-gray-500" />
                  <span>{userData.phone}</span>
                </div>
              )}
              {userData.location && (
                <div className="flex items-center">
                  <LocationOn fontSize="small" className="mr-1 text-gray-500" />
                  <span>{userData.location}</span>
                </div>
              )}
              {userData.website && (
                <div className="flex items-center">
                  <Link fontSize="small" className="mr-1 text-gray-500" />
                  <a href={userData.website.startsWith('http') ? userData.website : `https://${userData.website}`} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-blue-400 hover:underline"
                  >
                    {userData.website.replace(/^https?:\/\//i, '')}
                  </a>
                </div>
              )}
            </div>

            {userData.bio && (
              <div className="max-w-xl mx-auto mt-4 text-gray-300">
                {userData.bio}
              </div>
            )}
          </div>
        </div>
        
        {/* Profil İçeriği */}
        <div className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-800/70 backdrop-blur-sm shadow-xl">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Storage className="mr-2" fontSize="small" /> Hesap Bilgileri
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
              <div className="text-sm text-gray-400 mb-1">Kullanıcı ID</div>
              <div className="font-mono text-gray-300 text-sm">{userData.id || '-'}</div>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
              <div className="text-sm text-gray-400 mb-1">Rol</div>
              <div className="text-gray-300">
                <span className={`px-2 py-1 rounded-full text-xs font-medium
                  ${userData.role === 'admin' ? 'bg-purple-900/50 text-purple-300 border border-purple-700/50' : 
                    userData.role === 'premium' ? 'bg-amber-900/50 text-amber-300 border border-amber-700/50' : 
                    'bg-blue-900/50 text-blue-300 border border-blue-700/50'}`
                }>
                  {userData.role === 'admin' ? 'Yönetici' : 
                   userData.role === 'premium' ? 'Premium' : 
                   'Standart Kullanıcı'}
                </span>
              </div>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
              <div className="text-sm text-gray-400 mb-1">Depolama Alanı</div>
              <div className="flex flex-col">
                <div className="text-gray-300 mb-1">
                  {userData.storage_size ? (
                    <span>{(userData.storage_size / (1024 * 1024)).toFixed(2)} MB / 100 MB</span>
                  ) : (
                    <span>0.00 MB / 100 MB</span>
                  )}
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-blue-400 h-2.5 rounded-full" 
                    style={{ width: `${Math.min(100, (userData.storage_size || 0) / (1024 * 1024) / 100 * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
              <div className="text-sm text-gray-400 mb-1">Katılma Tarihi</div>
              <div className="text-gray-300">{joinDate || '-'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 