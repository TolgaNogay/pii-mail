import { useState } from 'react';
import { supabase } from '../utils/supabase';
import { PostgrestError } from '@supabase/supabase-js';

export const useWaitlist = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [waitlistCount, setWaitlistCount] = useState<number>(0);

  const joinWaitlist = async (email: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // E-posta kontrolü
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Lütfen geçerli bir e-posta adresi giriniz.');
      }

      // E-posta zaten kayıtlı mı kontrolü
      const { data: existingEmail, error: selectError } = await supabase
        .from('waitlist')
        .select('email')
        .eq('email', email)
        .single();

      if (existingEmail) {
        return {
          success: false,
          error: 'Bu e-posta adresi zaten bekleme listesinde kayıtlı.',
          alreadyRegistered: true
        };
      }

      if (selectError && selectError.code !== 'PGRST116') {
        console.error('Veritabanı sorgu hatası:', selectError);
        throw new Error('Bekleme listesi kontrolü sırasında bir hata oluştu.');
      }

      // Yeni kayıt ekleme
      const { error: insertError } = await supabase
        .from('waitlist')
        .insert([{ email }]);

      if (insertError) {
        if (insertError.code === '23505') { // Unique constraint violation
          return {
            success: false,
            error: 'Bu e-posta adresi zaten bekleme listesinde kayıtlı.',
            alreadyRegistered: true
          };
        }
        console.error('Kayıt ekleme hatası:', insertError);
        throw new Error('Bekleme listesine eklenirken bir hata oluştu.');
      }

      // Toplam kayıt sayısını güncelle
      const { count, error: countError } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true });

      if (countError) {
        console.error('Sayaç güncelleme hatası:', countError);
        throw new Error('Bekleme listesi sayısı güncellenirken bir hata oluştu.');
      }

      setWaitlistCount(count || 0);
      return { success: true };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 
        (err as PostgrestError)?.message || 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyiniz.';
      setError(errorMessage);
      return { success: false, error: errorMessage };

    } finally {
      setIsLoading(false);
    }
  };

  const getWaitlistCount = async () => {
    try {
      const { count, error } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('Sayaç alma hatası:', error);
        throw error;
      }
      
      setWaitlistCount(count || 0);
    } catch (err) {
      console.error('Bekleme listesi sayısı alınamadı:', err);
    }
  };

  return {
    joinWaitlist,
    getWaitlistCount,
    isLoading,
    error,
    waitlistCount
  };
}; 