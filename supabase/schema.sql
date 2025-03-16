-- Kullanıcı profilleri tablosu
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  display_name TEXT,
  avatar_url TEXT,
  email_address TEXT UNIQUE,
  phone_number TEXT,
  birth_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Profil güncelleme tetikleyicisi
CREATE OR REPLACE FUNCTION update_profile_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_profile_updated_at();

-- Yeni kullanıcı kaydı olduğunda otomatik profil oluşturma
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, user_id, email_address)
  VALUES (NEW.id, NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION handle_new_user();

-- E-posta tablosu
CREATE TABLE IF NOT EXISTS emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  recipient_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  subject TEXT,
  body TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  is_starred BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- E-posta güncelleme tetikleyicisi
CREATE TRIGGER emails_updated_at
BEFORE UPDATE ON emails
FOR EACH ROW
EXECUTE FUNCTION update_profile_updated_at();

-- E-posta ekleri tablosu
CREATE TABLE IF NOT EXISTS email_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email_id UUID REFERENCES emails(id) ON DELETE CASCADE,
  file_name TEXT,
  file_size INTEGER,
  file_type TEXT,
  file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- E-posta etiketleri tablosu
CREATE TABLE IF NOT EXISTS email_labels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- E-posta ve etiket ilişki tablosu
CREATE TABLE IF NOT EXISTS email_label_relations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email_id UUID REFERENCES emails(id) ON DELETE CASCADE,
  label_id UUID REFERENCES email_labels(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(email_id, label_id)
);

-- Güvenlik ayarları tablosu
CREATE TABLE IF NOT EXISTS security_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  recovery_email TEXT,
  last_password_change TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Güvenlik ayarları güncelleme tetikleyicisi
CREATE TRIGGER security_settings_updated_at
BEFORE UPDATE ON security_settings
FOR EACH ROW
EXECUTE FUNCTION update_profile_updated_at();

-- Oturum geçmişi tablosu
CREATE TABLE IF NOT EXISTS session_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  ip_address TEXT,
  user_agent TEXT,
  login_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  logout_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE
);

-- RLS (Row Level Security) Politikaları
-- Profiller için güvenlik politikası
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Kullanıcılar kendi profillerini görebilir"
  ON profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Kullanıcılar kendi profillerini düzenleyebilir"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- E-postalar için güvenlik politikası
ALTER TABLE emails ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Kullanıcılar kendi gönderdikleri veya aldıkları e-postaları görebilir"
  ON emails FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Kullanıcılar kendi e-postalarını gönderebilir"
  ON emails FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Kullanıcılar kendi e-postalarını güncelleyebilir"
  ON emails FOR UPDATE
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

-- E-posta ekleri için güvenlik politikası
ALTER TABLE email_attachments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Kullanıcılar kendi e-postalarının eklerini görebilir"
  ON email_attachments FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM emails
    WHERE emails.id = email_attachments.email_id
    AND (emails.sender_id = auth.uid() OR emails.recipient_id = auth.uid())
  ));

-- E-posta etiketleri için güvenlik politikası
ALTER TABLE email_labels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Kullanıcılar kendi etiketlerini görebilir"
  ON email_labels FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Kullanıcılar kendi etiketlerini oluşturabilir"
  ON email_labels FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Kullanıcılar kendi etiketlerini güncelleyebilir"
  ON email_labels FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Kullanıcılar kendi etiketlerini silebilir"
  ON email_labels FOR DELETE
  USING (auth.uid() = user_id);

-- Güvenlik ayarları için güvenlik politikası
ALTER TABLE security_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Kullanıcılar kendi güvenlik ayarlarını görebilir"
  ON security_settings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Kullanıcılar kendi güvenlik ayarlarını güncelleyebilir"
  ON security_settings FOR UPDATE
  USING (auth.uid() = user_id);

-- Oturum geçmişi için güvenlik politikası
ALTER TABLE session_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Kullanıcılar kendi oturum geçmişlerini görebilir"
  ON session_history FOR SELECT
  USING (auth.uid() = user_id); 