-- Tüm kullanıcıları silme işlemi
DO $$
BEGIN
    -- Önce public.folders tablosundan tüm kayıtları sil
    DELETE FROM public.folders;
    
    -- public.users tablosundan tüm kayıtları sil
    DELETE FROM public.users;
    
    -- Son olarak auth.users tablosundan tüm kayıtları sil
    DELETE FROM auth.users;
    
    RAISE NOTICE 'Tüm kullanıcılar ve ilişkili veriler başarıyla silindi.';
END $$; 