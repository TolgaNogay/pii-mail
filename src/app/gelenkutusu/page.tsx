'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  Search,
  ArrowBack,
  Delete,
  Archive,
  Watch,
  Label,
  MoreVert,
  Refresh,
  Inbox as InboxIcon,
  Star as StarIcon,
  StarBorder,
  Star as StarFilled,
  AccessTime,
  Send as SendIcon,
  InsertDriveFile,
  DeleteOutline,
  Add,
  ExpandMore,
  AttachFile,
  Circle as CircleIcon,
  Settings,
  Logout,
} from '@mui/icons-material';

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  date: string;
  isRead: boolean;
  isStarred: boolean;
  hasAttachments: boolean;
  labels: string[];
  avatar?: string;
}

interface Folder {
  id: string;
  name: string;
  icon: React.ReactNode;
  count?: number;
}

export default function InboxPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [userData, setUserData] = useState({ firstName: '', lastName: '' });
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const userButtonRef = useRef<HTMLDivElement>(null);

  const folders: Folder[] = [
    { id: 'inbox', name: 'Gelen Kutusu', icon: <InboxIcon fontSize="small" />, count: 12923 },
    { id: 'starred', name: 'Yıldızlı', icon: <StarIcon fontSize="small" />, count: 6 },
    { id: 'snoozed', name: 'Ertelenenler', icon: <AccessTime fontSize="small" />, count: 132 },
    { id: 'sent', name: 'Gönderilenler', icon: <SendIcon fontSize="small" />, count: 264 },
    { id: 'drafts', name: 'Taslaklar', icon: <InsertDriveFile fontSize="small" />, count: 5 },
    { id: 'trash', name: 'Çöp Kutusu', icon: <DeleteOutline fontSize="small" />, count: 254 },
  ];

  const customFolders: Folder[] = [
    { id: 'folder1', name: 'Özel Klasör 1', icon: <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />, count: 18 },
    { id: 'folder2', name: 'Özel Klasör 2', icon: <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />, count: 4 },
  ];

  const labels: { id: string; name: string; color: string; count: number }[] = [
    { id: 'work', name: 'İş', color: 'bg-purple-500', count: 162 },
    { id: 'personal', name: 'Kişisel', color: 'bg-blue-500', count: 37 },
    { id: 'finance', name: 'Finans', color: 'bg-green-500', count: 26 },
  ];

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      console.log("GelenkutusuPage - Kullanıcı durumu:", user ? "Oturum açık" : "Oturum kapalı", user);
      
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
          firstName,
          lastName
        });
        
        // Ayrıca profil tablosundan bilgileri de almaya çalış
        fetchUserData(user.id);
        
        // E-postaları getir
        fetchEmails();
      }
    } catch (error) {
      console.error("Oturum kontrolü sırasında hata:", error);
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
        setUserData({
          firstName: userData.first_name,
          lastName: userData.last_name || ''
        });
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
        setUserData({
          firstName: nameParts[0] || 'Kullanıcı',
          lastName: nameParts.slice(1).join(' ') || ''
        });
      }
    } catch (error) {
      console.error('Kullanıcı bilgileri alınırken beklenmeyen hata:', error);
    }
  };

  const fetchEmails = async () => {
    try {
      // TODO: Supabase'den e-postaları çek
      // Şimdilik örnek veri
      const mockEmails: Email[] = [
        {
          id: '1',
          from: 'Uxcel',
          subject: 'Get a chance to win $2,500 in Uxcel Design Contest',
          preview: 'Hi, over 20 years already sent their submission for our very first Design Contest. You can now submit your work and get a chance to win $2,500!',
          date: '2023-11-15T13:45:00',
          isRead: false,
          isStarred: false,
          hasAttachments: false,
          labels: ['İş'],
          avatar: 'U'
        },
        {
          id: '2',
          from: 'Git Huybrecht',
          subject: 'The basics of art direction',
          preview: 'Let\'s talk about art direction and how I go about it in webdesign. Through these emails I want to help...',
          date: '2023-12-26T09:30:00',
          isRead: false,
          isStarred: false,
          hasAttachments: false,
          labels: ['Kişisel'],
          avatar: 'G'
        },
        {
          id: '3',
          from: 'Stephany',
          subject: 'Work Enquiry',
          preview: 'Hi! My name is Stephany, I\'m a product lead at a stealth healthcare startup and I came across...',
          date: '2023-12-22T14:20:00',
          isRead: true,
          isStarred: false,
          hasAttachments: true,
          labels: ['İş'],
          avatar: 'S'
        },
        {
          id: '4',
          from: '10x Designers',
          subject: 'Only today: 50% OFF our Pro subscription!',
          preview: 'Hi friend, Thank you so much for supporting 10xDesigners this first year. As a thank you, we\'re...',
          date: '2023-11-28T08:15:00',
          isRead: true,
          isStarred: true,
          hasAttachments: false,
          labels: ['Promosyon'],
          avatar: '1'
        },
        {
          id: '5',
          from: 'Opal Camera',
          subject: 'Introducing the Tadpole.',
          preview: 'Introducing the Tadpole the smallest webcam ever built. With a category-first directional microphone...',
          date: '2023-11-19T11:05:00',
          isRead: true,
          isStarred: false,
          hasAttachments: true,
          labels: ['Ürünler'],
          avatar: 'O'
        },
        {
          id: '6',
          from: 'AlignUI Design System',
          subject: 'AlignUI Design System - Now Live & Ready for Your Project',
          preview: 'We are excited to announce that AlignUI Design System Beta Launches Tomorrow. The moment we\'ve...',
          date: '2023-11-13T16:40:00',
          isRead: false,
          isStarred: false,
          hasAttachments: false,
          labels: ['Tasarım'],
          avatar: 'A'
        },
        {
          id: '7',
          from: 'Medium',
          subject: 'Give the gift of unlimited access to Medium',
          preview: 'This holiday season, give the gift of unlimited access to Medium...',
          date: '2023-11-05T10:25:00',
          isRead: true,
          isStarred: true,
          hasAttachments: false,
          labels: ['Promosyon'],
          avatar: 'M'
        },
      ];
      setEmails(mockEmails);
    } catch (error) {
      console.error('E-postalar yüklenirken hata:', error);
    } finally {
      setLoading(false);
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

  const handleStarClick = (emailId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEmails(emails.map(email => 
      email.id === emailId 
        ? { ...email, isStarred: !email.isStarred }
        : email
    ));
  };

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    // Mark as read if not already
    if (!email.isRead) {
      setEmails(emails.map(e => 
        e.id === email.id 
          ? { ...e, isRead: true }
          : e
      ));
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    }
    
    // If it's from this year but not today
    if (date.getFullYear() === now.getFullYear()) {
      return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
    }
    
    // If it's from a different year
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const filteredEmails = emails.filter(email => {
    if (!searchQuery) return true;
    return (
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.preview.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Dropdown menüsünü göstermek/gizlemek için
  const toggleUserMenu = () => {
    if (userButtonRef.current) {
      const rect = userButtonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        right: window.innerWidth - rect.right
      });
    }
    setShowUserMenu(!showUserMenu);
  };

  return (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 min-h-screen flex flex-col text-white font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <div className="flex items-center p-4 border-b border-gray-800/60 backdrop-blur-md bg-black/20">
          <div className="flex items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-40 animate-pulse"></div>
              <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-full mr-2 shadow-lg shadow-blue-500/20 relative z-10">
                <span className="text-lg font-bold">P</span>
              </div>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">PiiMail</h1>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-md flex items-center bg-gray-800/40 rounded-full px-4 py-2 border border-gray-700/70 focus-within:ring-2 focus-within:ring-blue-500/60 focus-within:border-blue-500/60 shadow-inner">
              <Search className="text-gray-400 mr-2" fontSize="small" />
              <input
                type="text"
                placeholder="Ara..."
                className="flex-1 bg-transparent border-0 outline-none text-gray-200 placeholder:text-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="p-2 flex items-center justify-center bg-gray-800/50 border border-gray-700/40 rounded-full hover:bg-gray-800/70 transition-colors shadow-lg relative">
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-blue-500 border border-gray-900 animate-pulse"></span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
            </button>

            <div className="relative">
              <div 
                ref={userButtonRef}
                className="flex items-center bg-gradient-to-r from-gray-800/70 to-gray-800/50 backdrop-blur-lg border border-gray-700/40 pl-3 pr-1 py-1 rounded-full hover:bg-gray-800/70 transition-colors cursor-pointer shadow-lg group relative z-10"
                onClick={toggleUserMenu}
              >
                <div className="flex flex-col mr-2">
                  <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{userData.firstName || 'Tolga'}</span>
                  <span className="text-xs text-gray-400 truncate">{userEmail}</span>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-sm group-hover:bg-blue-500/30 transition-colors"></div>
                  <span className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium shadow-lg overflow-hidden border border-white/10 relative z-10">
                    <img 
                      src={`https://i.pravatar.cc/28?u=${userData.firstName || 'Tolga'}`} 
                      alt="User" 
                      className="w-full h-full object-cover" 
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-56 border-r border-gray-800/60 overflow-y-auto p-3 bg-gray-900/70 backdrop-blur-sm shadow-lg">
            <button className="mb-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg py-2 px-4 flex items-center justify-center shadow-lg shadow-blue-500/20 transition-all">
              <Add fontSize="small" className="mr-2" />
              <span>Yeni E-posta</span>
            </button>

            <div className="mb-6 space-y-1">
              {folders.map((folder) => (
                <div 
                  key={folder.id}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer ${
                    selectedFolder === folder.id 
                      ? 'bg-gradient-to-r from-blue-900/60 to-blue-800/20 text-blue-400 border-l-2 border-blue-500' 
                      : 'hover:bg-gray-800/40 text-gray-300'
                  } transition-all duration-200`}
                  onClick={() => setSelectedFolder(folder.id)}
                >
                  <div className="flex items-center">
                    <span className={`mr-3 ${selectedFolder === folder.id ? 'text-blue-400' : 'text-gray-400'}`}>{folder.icon}</span>
                    <span>{folder.name}</span>
                  </div>
                  {folder.count !== undefined && folder.count > 0 && (
                    <span className={`text-xs ${selectedFolder === folder.id ? 'text-blue-400 bg-blue-900/40' : 'text-gray-500'} px-1.5 py-0.5 rounded-full`}>{folder.count.toLocaleString()}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between px-3 py-2 text-xs text-gray-400 font-medium uppercase tracking-wider">
                <span>Klasörler</span>
                <button className="p-1 hover:bg-gray-800/60 hover:text-white rounded-full transition-colors">
                  <Add fontSize="small" />
                </button>
              </div>
              <div className="space-y-1 mt-1">
                {customFolders.map((folder) => (
                  <div 
                    key={folder.id}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer ${
                      selectedFolder === folder.id 
                        ? 'bg-gradient-to-r from-blue-900/60 to-blue-800/20 text-blue-400 border-l-2 border-blue-500' 
                        : 'hover:bg-gray-800/40 text-gray-300'
                    } transition-all duration-200`}
                    onClick={() => setSelectedFolder(folder.id)}
                  >
                    <div className="flex items-center">
                      {folder.icon}
                      <span>{folder.name}</span>
                    </div>
                    {folder.count !== undefined && folder.count > 0 && (
                      <span className={`text-xs ${selectedFolder === folder.id ? 'text-blue-400 bg-blue-900/40' : 'text-gray-500'} px-1.5 py-0.5 rounded-full`}>{folder.count}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between px-3 py-2 text-xs text-gray-400 font-medium uppercase tracking-wider">
                <span>Etiketler</span>
                <button className="p-1 hover:bg-gray-800/60 hover:text-white rounded-full transition-colors">
                  <Add fontSize="small" />
                </button>
              </div>
              <div className="space-y-1 mt-1">
                {labels.map((label) => (
                  <div 
                    key={label.id}
                    className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-800/40 text-gray-300 transition-all duration-200"
                  >
                    <div className="flex items-center">
                      <div className={`w-3 h-3 ${label.color} rounded-sm mr-3`}></div>
                      <span>{label.name}</span>
                    </div>
                    <span className="text-xs text-gray-500 px-1.5 py-0.5 rounded-full">{label.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Email List */}
          <div className={`${selectedEmail ? 'w-2/5' : 'flex-1'} flex flex-col overflow-hidden transition-all duration-300 bg-gradient-to-b from-gray-900/40 to-gray-900/10`}>
            <div className="flex items-center justify-between p-3 border-b border-gray-800/60 bg-gray-900/60 backdrop-blur-sm">
              <div className="text-sm font-medium flex items-center">
                <span className="text-white">{folders.find(f => f.id === selectedFolder)?.name || 'Gelen Kutusu'}</span>
                <span className="ml-2 text-xs px-2 py-0.5 bg-blue-900/40 text-blue-400 rounded-full border border-blue-900/60">
                  {emails.filter(e => !e.isRead).length} Okunmamış
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1.5 text-gray-400 hover:bg-gray-800/60 hover:text-white rounded-full transition-colors">
                  <Archive fontSize="small" />
                </button>
                <button className="p-1.5 text-gray-400 hover:bg-gray-800/60 hover:text-white rounded-full transition-colors">
                  <Delete fontSize="small" />
                </button>
                <button className="p-1.5 text-gray-400 hover:bg-gray-800/60 hover:text-white rounded-full transition-colors">
                  <Watch fontSize="small" />
                </button>
                <button className="p-1.5 text-gray-400 hover:bg-gray-800/60 hover:text-white rounded-full transition-colors">
                  <Label fontSize="small" />
                </button>
                <button className="p-1.5 text-gray-400 hover:bg-gray-800/60 hover:text-white rounded-full transition-colors">
                  <MoreVert fontSize="small" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto divide-y divide-gray-800/40 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="w-10 h-10 border-4 border-t-blue-500 border-r-blue-400 border-blue-200/30 rounded-full animate-spin"></div>
                </div>
              ) : filteredEmails.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <div className="mb-3 text-lg">Hiç e-posta bulunamadı</div>
                  <div className="text-sm">Arama kriterlerini değiştirmeyi deneyin</div>
                </div>
              ) : (
                filteredEmails.map((email) => (
                  <div 
                    key={email.id}
                    className={`flex items-start p-4 cursor-pointer ${
                      !email.isRead ? 'font-medium' : ''
                    } ${selectedEmail?.id === email.id 
                        ? 'bg-blue-900/20 border-l-2 border-l-blue-500' 
                        : 'hover:bg-gray-800/30 border-l-2 border-transparent'
                      } transition-all duration-200`}
                    onClick={() => handleEmailClick(email)}
                  >
                    <div className="mr-3 flex flex-col items-center">
                      {!email.isRead && (
                        <div className="w-2 h-2 rounded-full bg-blue-500 mb-2 animate-pulse"></div>
                      )}
                      <button 
                        className="focus:outline-none" 
                        onClick={(e) => handleStarClick(email.id, e)}
                      >
                        {email.isStarred ? (
                          <StarFilled fontSize="small" className="text-yellow-500" />
                        ) : (
                          <StarBorder fontSize="small" className="text-gray-500 hover:text-gray-300" />
                        )}
                      </button>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-medium mr-2 shadow-sm border border-blue-300/20">
                            {email.avatar || email.from.charAt(0)}
                          </div>
                          <span className="truncate font-medium text-white">{email.from}</span>
                        </div>
                        <div className="text-xs text-gray-400 whitespace-nowrap ml-2">
                          {formatDate(email.date)}
                        </div>
                      </div>
                      <div className="text-sm truncate mb-1 text-gray-200">{email.subject}</div>
                      <div className={`text-xs truncate ${email.isRead ? 'text-gray-500' : 'text-gray-400'}`}>
                        {email.preview}
                      </div>
                    </div>
                    
                    {email.hasAttachments && (
                      <div className="ml-2 text-blue-400">
                        <AttachFile fontSize="small" />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Email Detail View */}
          {selectedEmail && (
            <div className="flex-1 border-l border-gray-800/60 overflow-hidden flex flex-col bg-gradient-to-b from-gray-900/20 to-transparent">
              <div className="p-4 border-b border-gray-800/60 flex items-center justify-between bg-gray-900/60 backdrop-blur-sm">
                <div className="flex items-center flex-1 min-w-0 mr-2">
                  <button 
                    className="p-1.5 text-gray-400 hover:bg-gray-800/60 hover:text-white rounded-full mr-2 transition-colors flex-shrink-0"
                    onClick={() => setSelectedEmail(null)}
                  >
                    <ArrowBack fontSize="small" />
                  </button>
                  <h2 className="text-lg font-medium text-white truncate">{selectedEmail.subject}</h2>
                </div>
                <div className="flex items-center space-x-1.5 flex-shrink-0">
                  <button className="p-1.5 text-gray-400 hover:bg-gray-800/60 hover:text-white rounded-full transition-colors">
                    <Archive fontSize="small" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:bg-gray-800/60 hover:text-white rounded-full transition-colors">
                    <Delete fontSize="small" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:bg-gray-800/60 hover:text-white rounded-full transition-colors">
                    <MoreVert fontSize="small" />
                  </button>
                </div>
              </div>
              
              <div className="p-4 border-b border-gray-800/60 bg-gray-900/30 backdrop-blur-sm">
                <div className="flex items-start">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-20"></div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0 relative z-10 border border-blue-300/20">
                      {selectedEmail.avatar || selectedEmail.from.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 ml-3">
                    <div className="flex items-center justify-between flex-wrap">
                      <div className="font-medium text-white truncate">{selectedEmail.from}</div>
                      <div className="text-xs text-gray-400 ml-2 flex-shrink-0">
                        {new Date(selectedEmail.date).toLocaleDateString('tr-TR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">to me</div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 p-6 overflow-y-auto text-gray-300 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                <div className="prose prose-invert max-w-none">
                  <p>{selectedEmail.preview}</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies
                    tincidunt, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Nullam auctor, nisl
                    eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                  </p>
                  <p>
                    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
                    Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget
                    tortor risus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.
                  </p>
                  {selectedEmail.hasAttachments && (
                    <div className="mt-6 border border-gray-700/70 rounded-lg p-4 bg-gray-800/40 backdrop-blur-sm shadow-md">
                      <div className="text-sm font-medium mb-3 text-white">Ekler (1)</div>
                      <div className="flex items-center p-2 border border-gray-700/70 rounded-lg bg-gray-800/60 hover:bg-gray-800 transition-colors shadow-inner">
                        <InsertDriveFile className="text-blue-400 mr-2" />
                        <div className="flex-1">
                          <div className="text-sm text-gray-200">Overview.mp4</div>
                          <div className="text-xs text-gray-500">23.5MB</div>
                        </div>
                        <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors px-3 py-1 rounded-md hover:bg-blue-900/20">
                          İndir
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-800/60 bg-gray-900/40 backdrop-blur-sm">
                <div className="flex items-center justify-end">
                  <button className="px-4 py-2 border border-gray-700/70 text-gray-300 rounded-lg hover:bg-gray-800/60 transition-colors mr-2 shadow-sm">
                    İlet
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg shadow-lg shadow-blue-500/20 transition-all">
                    Yanıtla
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Portal for dropdown menu */}
      {showUserMenu && (
        <div 
          className="fixed top-0 left-0 w-full h-full z-[9999] pointer-events-none"
          onClick={() => setShowUserMenu(false)}
        >
          <div 
            className="absolute py-2 bg-gray-800/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-xl animate-fadeIn pointer-events-auto"
            style={{ 
              top: `${menuPosition.top}px`, 
              right: `${menuPosition.right}px`,
              width: '240px'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center px-4 py-3 border-b border-gray-700">
              <div className="mr-3 flex-shrink-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium shadow-md overflow-hidden border border-white/10">
                  <img 
                    src={`https://i.pravatar.cc/36?u=${userData.firstName || 'Tolga'}`} 
                    alt="User" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-white truncate">{userData.firstName || 'Tolga'} {userData.lastName}</p>
                <p className="text-xs text-gray-400 truncate">{userEmail}</p>
              </div>
            </div>
            
            <a href="/profil" className="flex items-center px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Profil
            </a>
            
            <a href="/ayarlar" className="flex items-center px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              Ayarlar
            </a>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2.5 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Çıkış Yap
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 