'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function InboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [userEmail, setUserEmail] = useState('');
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchUserAndEmails = async () => {
      try {
        // Kullanıcı bilgilerini al
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.email) {
          setUserEmail(user.email);
        }

        // Okunmamış e-posta sayısını al
        // TODO: Gerçek e-posta sayısını Supabase'den al
        const { data: emails, error } = await supabase
          .from('emails')
          .select('id')
          .eq('is_read', false)
          .eq('recipient', user?.email);

        if (!error) {
          const count = emails?.length || 0;
          setUnreadCount(count);
          // Başlığı güncelle
          document.title = count > 0 ? `(${count}) Gelen Kutusu — ${user?.email}` : `Gelen Kutusu — ${user?.email}`;
        }
      } catch (error) {
        console.error('E-posta sayısı alınırken hata:', error);
      }
    };

    fetchUserAndEmails();

    // WebSocket veya polling ile e-posta sayısını güncelle
    const interval = setInterval(fetchUserAndEmails, 30000); // Her 30 saniyede bir güncelle

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {children}
    </>
  );
} 