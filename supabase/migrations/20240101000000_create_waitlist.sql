-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserting emails
CREATE POLICY "Allow anonymous insert" ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow reading count only
CREATE POLICY "Allow anonymous read count" ON waitlist
  FOR SELECT
  TO anon
  USING (true); 