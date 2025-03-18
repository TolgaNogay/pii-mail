-- Kullanıcı tablosuna pii_email alanı ekleme
alter table public.users
add column pii_email text unique,
add column username text unique;

-- Username ve pii_email için check constraint
alter table public.users
add constraint username_format check (
  username ~ '^[a-z0-9][a-z0-9\-]*[a-z0-9]$' and
  length(username) >= 3 and
  length(username) <= 30
);

-- PII email formatı için check constraint
alter table public.users
add constraint pii_email_format check (
  pii_email ~ '^[a-z0-9][a-z0-9\-\.]*[a-z0-9]@pii\.email$'
);

-- Username ve pii_email oluşturma fonksiyonu güncelleme
create or replace function public.handle_new_user()
returns trigger as $$
declare
  username_attempt text;
  email_name text;
begin
  -- E-posta adresinden kullanıcı adı önerisi oluştur
  email_name := split_part(new.email, '@', 1);
  -- Özel karakterleri kaldır ve küçük harfe çevir
  username_attempt := lower(regexp_replace(email_name, '[^a-zA-Z0-9]', '', 'g'));
  
  -- Eğer bu kullanıcı adı zaten varsa, sonuna rastgele sayı ekle
  while exists (select 1 from public.users where username = username_attempt) loop
    username_attempt := username_attempt || floor(random() * 1000)::text;
  end loop;

  -- Kullanıcı kaydını oluştur
  insert into public.users (
    id,
    email,
    username,
    pii_email,
    full_name
  )
  values (
    new.id,
    new.email,
    username_attempt,
    username_attempt || '@pii.email',
    new.raw_user_meta_data->>'full_name'
  );
  
  return new;
end;
$$ language plpgsql security definer;

-- Username güncelleme fonksiyonu
create or replace function public.update_username(
  user_id uuid,
  new_username text
)
returns text
language plpgsql
security definer
as $$
declare
  old_username text;
begin
  -- Eski kullanıcı adını al
  select username into old_username
  from public.users
  where id = user_id;

  -- Yeni kullanıcı adı kontrolü
  if not (new_username ~ '^[a-z0-9][a-z0-9\-]*[a-z0-9]$' and
          length(new_username) >= 3 and
          length(new_username) <= 30) then
    raise exception 'Geçersiz kullanıcı adı formatı';
  end if;

  -- Kullanıcı adı ve e-posta güncelleme
  update public.users
  set 
    username = new_username,
    pii_email = new_username || '@pii.email'
  where id = user_id;

  return new_username || '@pii.email';
end;
$$; 