import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL ve Anon Key tanımlanmamış. Lütfen .env.local dosyasını kontrol edin.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Kullanıcı kimlik doğrulama işlemleri
export const auth = {
  // E-posta ve şifre ile kayıt
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  },

  // E-posta ve şifre ile giriş
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  // Çıkış yapma
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Mevcut kullanıcıyı alma
  getUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    return { data, error };
  },

  // Oturum durumunu dinleme
  onAuthStateChange: (callback: (event: any, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  },

  // Şifre sıfırlama e-postası gönderme
  resetPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/sifremi-yenile`,
    });
    return { data, error };
  },

  // Şifre güncelleme
  updatePassword: async (newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    return { data, error };
  },
};

// Kullanıcı profili işlemleri
export const profiles = {
  // Kullanıcı profili oluşturma
  createProfile: async (userId: string, profileData: any) => {
    const { data, error } = await supabase
      .from('profiles')
      .insert([{ user_id: userId, ...profileData }]);
    return { data, error };
  },

  // Kullanıcı profilini alma
  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    return { data, error };
  },

  // Kullanıcı profilini güncelleme
  updateProfile: async (userId: string, profileData: any) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('user_id', userId);
    return { data, error };
  },
};

// E-posta işlemleri
export const emails = {
  // E-posta gönderme
  sendEmail: async (emailData: any) => {
    const { data, error } = await supabase
      .from('emails')
      .insert([emailData]);
    return { data, error };
  },

  // Gelen e-postaları alma
  getInbox: async (userId: string, page = 0, limit = 20) => {
    const { data, error } = await supabase
      .from('emails')
      .select('*')
      .eq('recipient_id', userId)
      .order('created_at', { ascending: false })
      .range(page * limit, (page + 1) * limit - 1);
    return { data, error };
  },

  // Gönderilen e-postaları alma
  getSent: async (userId: string, page = 0, limit = 20) => {
    const { data, error } = await supabase
      .from('emails')
      .select('*')
      .eq('sender_id', userId)
      .order('created_at', { ascending: false })
      .range(page * limit, (page + 1) * limit - 1);
    return { data, error };
  },

  // E-posta detaylarını alma
  getEmail: async (emailId: string) => {
    const { data, error } = await supabase
      .from('emails')
      .select('*')
      .eq('id', emailId)
      .single();
    return { data, error };
  },

  // E-postayı okundu olarak işaretleme
  markAsRead: async (emailId: string) => {
    const { data, error } = await supabase
      .from('emails')
      .update({ is_read: true })
      .eq('id', emailId);
    return { data, error };
  },

  // E-postayı silme (çöp kutusuna taşıma)
  moveToTrash: async (emailId: string) => {
    const { data, error } = await supabase
      .from('emails')
      .update({ is_deleted: true })
      .eq('id', emailId);
    return { data, error };
  },
};

export default supabase; 