-- Drop existing policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Create new policies
CREATE POLICY "Public profiles are viewable by everyone"
ON public.profiles FOR SELECT
USING ( true );

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK ( auth.uid() = id );

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING ( auth.uid() = id );

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY; 