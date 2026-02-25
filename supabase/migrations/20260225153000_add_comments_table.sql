-- Create comments table
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_avatar_url TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Allow public read access to comments
CREATE POLICY "Allow public read access to comments"
ON comments FOR SELECT
TO public
USING (true);

-- Allow authenticated users to insert comments
CREATE POLICY "Allow authenticated users to insert comments"
ON comments FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow users to delete their own comments
CREATE POLICY "Allow users to delete their own comments"
ON comments FOR DELETE
TO authenticated
USING (auth.uid() = author_id);
