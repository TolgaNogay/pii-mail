-- E-posta klasörleri tablosu
create table public.folders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  name text not null,
  type text not null check (type in ('inbox', 'sent', 'drafts', 'trash', 'spam', 'custom')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- E-postalar tablosu
create table public.emails (
  id uuid default gen_random_uuid() primary key,
  sender_id uuid references public.users(id) on delete set null,
  subject text,
  content text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  sent_at timestamp with time zone,
  is_draft boolean default false not null
);

-- E-posta alıcıları tablosu (çoklu alıcı desteği için)
create table public.email_recipients (
  id uuid default gen_random_uuid() primary key,
  email_id uuid references public.emails(id) on delete cascade not null,
  user_id uuid references public.users(id) on delete cascade not null,
  type text not null check (type in ('to', 'cc', 'bcc')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- E-posta klasör ilişkileri tablosu
create table public.email_folders (
  id uuid default gen_random_uuid() primary key,
  email_id uuid references public.emails(id) on delete cascade not null,
  folder_id uuid references public.folders(id) on delete cascade not null,
  user_id uuid references public.users(id) on delete cascade not null,
  is_read boolean default false not null,
  is_starred boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(email_id, folder_id, user_id)
);

-- E-posta ekleri tablosu
create table public.attachments (
  id uuid default gen_random_uuid() primary key,
  email_id uuid references public.emails(id) on delete cascade not null,
  file_name text not null,
  file_size bigint not null,
  file_type text not null,
  storage_path text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security politikaları
alter table public.folders enable row level security;
alter table public.emails enable row level security;
alter table public.email_recipients enable row level security;
alter table public.email_folders enable row level security;
alter table public.attachments enable row level security;

-- Folders politikaları
create policy "Users can view their own folders"
  on public.folders for select
  using (auth.uid() = user_id);

create policy "Users can create their own folders"
  on public.folders for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own folders"
  on public.folders for update
  using (auth.uid() = user_id);

create policy "Users can delete their own folders"
  on public.folders for delete
  using (auth.uid() = user_id);

-- Emails politikaları
create policy "Users can view emails they have access to"
  on public.emails for select
  using (
    auth.uid() = sender_id or 
    exists (
      select 1 from public.email_recipients 
      where email_id = emails.id and user_id = auth.uid()
    )
  );

create policy "Users can create emails"
  on public.emails for insert
  with check (auth.uid() = sender_id);

create policy "Users can update their draft emails"
  on public.emails for update
  using (auth.uid() = sender_id and is_draft = true);

-- Email recipients politikaları
create policy "Users can view email recipients they have access to"
  on public.email_recipients for select
  using (
    exists (
      select 1 from public.emails
      where id = email_recipients.email_id 
      and (sender_id = auth.uid() or exists (
        select 1 from public.email_recipients er
        where er.email_id = emails.id and er.user_id = auth.uid()
      ))
    )
  );

-- Email folders politikaları
create policy "Users can view their email folder relations"
  on public.email_folders for select
  using (auth.uid() = user_id);

create policy "Users can manage their email folder relations"
  on public.email_folders for insert
  with check (auth.uid() = user_id);

create policy "Users can update their email folder relations"
  on public.email_folders for update
  using (auth.uid() = user_id);

-- Attachments politikaları
create policy "Users can view attachments they have access to"
  on public.attachments for select
  using (
    exists (
      select 1 from public.emails
      where id = attachments.email_id 
      and (sender_id = auth.uid() or exists (
        select 1 from public.email_recipients
        where email_id = emails.id and user_id = auth.uid()
      ))
    )
  );

-- Varsayılan klasörleri oluşturmak için fonksiyon
create or replace function public.create_default_folders()
returns trigger as $$
begin
  -- Varsayılan klasörleri oluştur
  insert into public.folders (user_id, name, type)
  values
    (new.id, 'Gelen Kutusu', 'inbox'),
    (new.id, 'Gönderilenler', 'sent'),
    (new.id, 'Taslaklar', 'drafts'),
    (new.id, 'Çöp Kutusu', 'trash'),
    (new.id, 'Spam', 'spam');
  return new;
end;
$$ language plpgsql security definer;

-- Yeni kullanıcı oluşturulduğunda varsayılan klasörleri oluştur
create trigger on_user_created_create_folders
  after insert on public.users
  for each row execute procedure public.create_default_folders();

-- Updated_at güncellemesi için trigger fonksiyonu
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

-- Tablolar için updated_at trigger'ları
create trigger handle_folders_updated_at
  before update on public.folders
  for each row execute procedure public.handle_updated_at();

create trigger handle_emails_updated_at
  before update on public.emails
  for each row execute procedure public.handle_updated_at();

create trigger handle_email_folders_updated_at
  before update on public.email_folders
  for each row execute procedure public.handle_updated_at(); 