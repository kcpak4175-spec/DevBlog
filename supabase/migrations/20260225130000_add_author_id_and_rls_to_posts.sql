-- Add author_id to posts table
ALTER TABLE posts 
ADD COLUMN IF NOT EXISTS author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Update RLS policies for posts table

-- Allow insert only for authenticated users
DROP POLICY IF EXISTS "Allow authenticated users to insert posts" ON posts;
CREATE POLICY "Allow authenticated users to insert posts"
ON posts FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow update for authors or admin (kcpak4175@gmail.com)
DROP POLICY IF EXISTS "Allow update for authors or admin" ON posts;
CREATE POLICY "Allow update for authors or admin"
ON posts FOR UPDATE
TO authenticated
USING (
  auth.uid() = author_id 
  OR auth.jwt() ->> 'email' = 'kcpak4175@gmail.com'
);

-- Allow delete for authors or admin
DROP POLICY IF EXISTS "Allow delete for authors or admin" ON posts;
CREATE POLICY "Allow delete for authors or admin"
ON posts FOR DELETE
TO authenticated
USING (
  auth.uid() = author_id 
  OR auth.jwt() ->> 'email' = 'kcpak4175@gmail.com'
);
