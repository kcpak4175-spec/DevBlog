-- Allow authenticated users to insert posts
CREATE POLICY "Allow authenticated users to insert posts"
ON posts FOR INSERT
TO authenticated
WITH CHECK (true);

-- Also allow public to read posts (redundant if already exists, but ensuring consistency)
-- The initial migration already has "Allow public read access to posts" for SELECT.

-- If you want to allow anonymous posts (for testing), you can change TO authenticated to TO public.
-- But usually, it's better to require authentication.
