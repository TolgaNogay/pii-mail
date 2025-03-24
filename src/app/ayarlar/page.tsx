'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Settings, ArrowBack, Save, Logout, Person, Key, VpnKey, Shield, Notifications, AutoDelete, Email, AccountCircle, CloudUpload } from '@mui/icons-material';

export default function AyarlarPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [userData, setUserData] = useState({ 
    firstName: '',
    lastName: '',
    email: '',
    avatarUrl: '',
  });
  const [userEmail, setUserEmail] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  
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
        console.log("AyarlarPage - Kullanıcı oturumu doğrulandı, id:", user.id);
        
        // Profil bilgilerini çek
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('first_name, last_name, avatar_url')
          .eq('id', user.id)
          .single();
        
        if (profileError) {
          console.error('AyarlarPage - Profil bilgileri alınırken hata:', profileError.message);
        } else if (profile) {
          setUserData({
            firstName: profile.first_name || '',
            lastName: profile.last_name || '',
            email: user.email || '',
            avatarUrl: profile.avatar_url || ''
          });
        }
      }
    } catch (error) {
      console.error("AyarlarPage - Oturum kontrolü sırasında hata:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      window.location.href = '/giris';
    } catch (error) {
      console.error("Çıkış yapılırken hata:", error);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    setAvatarFile(file);
    
    // Görsel önizleme oluştur
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const uploadAvatar = async () => {
    try {
      if (!avatarFile) return null;
      
      setUploadingAvatar(true);
      
      // Kullanıcı ID'sini al
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      
      // Benzersiz bir dosya adı oluştur
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `avatars/${fileName}`;
      
      // Dosyayı Supabase Storage'a yükle
      const { error: uploadError } = await supabase.storage
        .from('user-avatars')
        .upload(filePath, avatarFile);
        
      if (uploadError) {
        console.error('Avatar yükleme hatası:', uploadError);
        return null;
      }
      
      // Dosya için genel URL al
      const { data: { publicUrl } } = supabase.storage
        .from('user-avatars')
        .getPublicUrl(filePath);
        
      return publicUrl;
    } catch (error) {
      console.error('Avatar yükleme sırasında hata oluştu:', error);
      return null;
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    setSaveError(false);
    setSaveSuccess(false);
    let hasError = false;
    let avatarUrl = userData.avatarUrl;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Kullanıcı bulunamadı');

      // Avatar yükleme işlemi
      if (avatarFile) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(`${user.id}/${Date.now()}-${avatarFile.name}`, avatarFile);

        if (uploadError) {
          console.error('AyarlarPage - Avatar yüklenirken hata:', uploadError);
          hasError = true;
        } else if (uploadData) {
          const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(uploadData.path);
          avatarUrl = publicUrl;
        }
      }

      // Sadece profiles tablosunu güncelle
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          first_name: userData.firstName,
          last_name: userData.lastName,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });

      if (updateError) {
        console.error('AyarlarPage - Profil bilgileri güncellenirken hata:', updateError.message);
        hasError = true;
      }

      if (!hasError) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (error: any) {
      console.error('AyarlarPage - Ayarlar kaydedilirken beklenmeyen hata:', error);
      hasError = true;
    } finally {
      setIsSaving(false);
      if (hasError) {
        setSaveError(true);
        setTimeout(() => setSaveError(false), 3000);
      }
    }
  };

  // Kullanıcı avatarını almak için fonksiyon
  const getUserAvatar = () => {
    if (avatarPreview) {
      return avatarPreview;
    }
    if (userData.avatarUrl) {
      return userData.avatarUrl;
    }
    return `https://api.dicebear.com/7.x/micah/svg?seed=${encodeURIComponent(userData.firstName || userEmail || 'Kullanıcı')}&radius=50&backgroundColor=2563eb`;
  };

  // Sekmeleri tanımla
  const tabs = [
    { id: 'profile', label: 'Profil', icon: <Person /> },
    { id: 'security', label: 'Güvenlik', icon: <Shield /> },
    { id: 'notifications', label: 'Bildirimler', icon: <Notifications /> },
  ];

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
            <Settings className="mr-2" fontSize="large" /> Ayarlar
          </h1>
          <div className="ml-auto">
            {saveError && (
              <div className="mr-3 bg-red-700/80 text-white px-3 py-1 rounded-lg animate-pulse">
                Hata oluştu!
              </div>
            )}
            <button
              className={`px-4 py-2 rounded-lg flex items-center ${saveSuccess ? 'bg-green-600' : saveError ? 'bg-red-600' : isSaving ? 'bg-gray-700' : 'bg-blue-600 hover:bg-blue-500'} transition-colors`}
              onClick={handleSaveSettings}
              disabled={isSaving}
            >
              <Save className="mr-2" fontSize="small" />
              {saveSuccess ? 'Kaydedildi!' : saveError ? 'Tekrar Dene' : isSaving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-gray-900/50 rounded-lg border border-gray-800/50 overflow-hidden shadow-lg">
              <div className="p-4 border-b border-gray-800/50 flex items-center">
                <div className="relative mr-3">
                  <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-sm"></div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-lg font-medium overflow-hidden border border-white/10 relative z-10">
                    <img 
                      src={getUserAvatar()} 
                      alt={userData.firstName} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
                <div>
                  <div className="font-semibold">{userData.firstName} {userData.lastName}</div>
                  <div className="text-sm text-gray-400">{userEmail}</div>
                </div>
              </div>

              <div className="p-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`w-full text-left px-4 py-3 rounded-lg mb-1 flex items-center transition-colors ${
                      activeTab === tab.id 
                        ? 'bg-blue-900/40 text-blue-400 border-l-2 border-blue-500' 
                        : 'hover:bg-gray-800/40 text-gray-300'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}

                <div className="mt-2 pt-2 border-t border-gray-800/50">
                  <button
                    className="w-full text-left px-4 py-3 rounded-lg flex items-center text-red-400 hover:bg-gray-800/40 hover:text-red-300 transition-colors"
                    onClick={handleLogout}
                  >
                    <Logout className="mr-3" />
                    Çıkış Yap
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 bg-gray-900/50 rounded-lg border border-gray-800/50 p-6 shadow-lg">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Profil Bilgileri</h2>
                
                <div className="space-y-6">
                  {/* Avatar Upload */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative mb-4">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-800 border-2 border-gray-700 shadow-lg">
                        <img 
                          src={avatarPreview || userData.avatarUrl || `https://api.dicebear.com/7.x/micah/svg?seed=${encodeURIComponent(userData.firstName)}&radius=50&backgroundColor=2563eb`} 
                          alt={userData.firstName} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <label 
                        htmlFor="avatar-upload" 
                        className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center cursor-pointer transition-colors shadow-lg border border-blue-700"
                      >
                        <CloudUpload fontSize="small" />
                      </label>
                      <input 
                        id="avatar-upload" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleAvatarChange}
                      />
                    </div>
                    <div className="text-sm text-gray-400">
                      {!avatarFile && "Profil resmi yüklemek için tıklayın"}
                      {avatarFile && (
                        <div className="flex items-center">
                          <span className="text-green-400 mr-2">✓</span>
                          {avatarFile.name} ({Math.round(avatarFile.size / 1024)} KB)
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Ad</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 rounded-lg bg-gray-800/70 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                        value={userData.firstName}
                        onChange={(e) => setUserData({...userData, firstName: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Soyad</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 rounded-lg bg-gray-800/70 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                        value={userData.lastName}
                        onChange={(e) => setUserData({...userData, lastName: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">E-posta Adresi</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-2 rounded-lg bg-gray-800/70 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                      value={userEmail}
                      disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">E-posta adresi değiştirilemez</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Güvenlik Ayarları</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="flex items-center text-lg font-medium mb-3">
                      <Key className="mr-2" /> Şifre Değiştir
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Mevcut Şifre</label>
                        <input 
                          type="password" 
                          className="w-full px-4 py-2 rounded-lg bg-gray-800/70 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Yeni Şifre</label>
                        <input 
                          type="password" 
                          className="w-full px-4 py-2 rounded-lg bg-gray-800/70 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Şifreyi Tekrarla</label>
                        <input 
                          type="password" 
                          className="w-full px-4 py-2 rounded-lg bg-gray-800/70 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                          placeholder="••••••••"
                        />
                      </div>
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors">
                        Şifreyi Güncelle
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-800/70">
                    <h3 className="flex items-center text-lg font-medium mb-3">
                      <VpnKey className="mr-2" /> İki Faktörlü Doğrulama
                    </h3>
                    <p className="text-gray-400 mb-3">İki faktörlü doğrulama, hesabınızı korumak için ek bir güvenlik katmanı ekler.</p>
                    
                    <div className="flex items-center mb-3">
                      <span className="bg-red-900/30 text-red-400 px-2 py-1 rounded text-xs font-medium">Devre Dışı</span>
                      <button className="ml-4 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-sm rounded transition-colors">
                        Etkinleştir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Bildirim Tercihleri</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-800/70">
                    <div>
                      <h3 className="font-medium">E-posta Bildirimleri</h3>
                      <p className="text-sm text-gray-400">Yeni e-postalar hakkında bildirim al</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-800/70">
                    <div>
                      <h3 className="font-medium">Masaüstü Bildirimleri</h3>
                      <p className="text-sm text-gray-400">Tarayıcı bildirimleri al</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-800/70">
                    <div>
                      <h3 className="font-medium">Özet E-postaları</h3>
                      <p className="text-sm text-gray-400">Haftalık özet e-postaları al</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="bg-gray-800/40 rounded-lg p-4 mt-4 border border-gray-800/70">
                    <h3 className="font-medium flex items-center"><Email className="mr-2" fontSize="small" /> E-posta Teslim Ayarları</h3>
                    <p className="text-sm text-gray-400 mt-1 mb-3">E-postaların hangi sıklıkta teslim edileceğini ayarlayın</p>
                    
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="radio" name="delivery" className="form-radio h-4 w-4 text-blue-500 bg-gray-800 border-gray-600" defaultChecked />
                        <span className="ml-2">Anlık teslim (her e-posta geldiğinde)</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="delivery" className="form-radio h-4 w-4 text-blue-500 bg-gray-800 border-gray-600" />
                        <span className="ml-2">Saatlik toplu teslimat</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="delivery" className="form-radio h-4 w-4 text-blue-500 bg-gray-800 border-gray-600" />
                        <span className="ml-2">Günlük özet (günde bir kez)</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 