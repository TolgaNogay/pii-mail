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
        throw new Error('Geçerli bir e-posta adresi giriniz.');
      }

      // E-posta zaten kayıtlı mı kontrolü
      const { data: existingEmail, error: selectError } = await supabase
        .from('waitlist')
        .select('email')
        .eq('email', email)
        .single();

      if (selectError && selectError.code !== 'PGRST116') {
        throw selectError;
      }

      if (existingEmail) {
        throw new Error('Bu e-posta adresi zaten kayıtlı.');
      }

      // Yeni kayıt ekleme
      const { error: insertError } = await supabase
        .from('waitlist')
        .insert([{ email }]);

      if (insertError) throw insertError;

      // Toplam kayıt sayısını güncelle
      const { count, error: countError } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true });

      if (countError) throw countError;
      setWaitlistCount(count || 0);

      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 
        (err as PostgrestError)?.message || 'Bir hata oluştu.';
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

      if (error) throw error;
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