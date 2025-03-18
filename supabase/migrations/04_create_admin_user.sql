-- Önce mevcut admin kullanıcısını kontrol et ve varsa sil
DO $$
BEGIN
    -- Auth tablosundan silme
    DELETE FROM auth.users WHERE email = 'yonetici@pii.email';
    -- Public users tablosundan silme (cascade olduğu için otomatik silinecek)
END $$;

-- Admin kullanıcısını oluştur
DO $$
DECLARE
    admin_id uuid := gen_random_uuid();
BEGIN
    -- Auth.users tablosuna ekle
    INSERT INTO auth.users (
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        created_at,
        updated_at,
        raw_app_meta_data,
        raw_user_meta_data
    ) VALUES (
        admin_id,
        'authenticated',
        'authenticated',
        'yonetici@pii.email',
        crypt('Senirkent32', gen_salt('bf')),
        now(),
        now(),
        now(),
        '{"provider": "email", "providers": ["email"]}',
        '{"full_name": "PiMail Yönetici"}'
    );

    -- Public.users tablosuna ekle
    INSERT INTO public.users (
        id,
        email,
        username,
        pii_email,
        full_name,
        role,
        is_verified,
        storage_limit,
        created_at,
        updated_at
    ) VALUES (
        admin_id,
        'yonetici@pii.email',
        'yonetici',
        'yonetici@pii.email',
        'PiMail Yönetici',
        'admin',
        true,
        5368709120, -- 5GB storage limit
        now(),
        now()
    );

    -- Varsayılan klasörleri oluştur
    INSERT INTO public.folders (user_id, name, type)
    VALUES
        (admin_id, 'Gelen Kutusu', 'inbox'),
        (admin_id, 'Gönderilenler', 'sent'),
        (admin_id, 'Taslaklar', 'drafts'),
        (admin_id, 'Çöp Kutusu', 'trash'),
        (admin_id, 'Spam', 'spam');

    RAISE NOTICE 'Admin hesabı başarıyla oluşturuldu. ID: %', admin_id;
EXCEPTION
    WHEN unique_violation THEN
        RAISE EXCEPTION 'Bu e-posta adresi veya kullanıcı adı zaten kullanımda';
    WHEN others THEN
        RAISE EXCEPTION 'Bir hata oluştu: %', SQLERRM;
END $$; 