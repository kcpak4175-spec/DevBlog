-- Create post_tags junction table (IF NOT EXISTS)
CREATE TABLE IF NOT EXISTS post_tags (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Enable RLS on post_tags
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;

-- Allow public read access to post_tags
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'post_tags' AND policyname = 'Allow public read access to post_tags'
    ) THEN
        CREATE POLICY "Allow public read access to post_tags"
        ON post_tags FOR SELECT TO public USING (true);
    END IF;
END $$;

-- Allow insert for authenticated users
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'post_tags' AND policyname = 'Allow authenticated users to insert post_tags'
    ) THEN
        CREATE POLICY "Allow authenticated users to insert post_tags"
        ON post_tags FOR INSERT TO authenticated WITH CHECK (true);
    END IF;
END $$;

-- Allow delete for authenticated users
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'post_tags' AND policyname = 'Allow authenticated users to delete post_tags'
    ) THEN
        CREATE POLICY "Allow authenticated users to delete post_tags"
        ON post_tags FOR DELETE TO authenticated USING (true);
    END IF;
END $$;

-- Migrate existing relationships (only if tag_id exists in posts)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'posts' AND column_name = 'tag_id'
    ) THEN
        INSERT INTO post_tags (post_id, tag_id)
        SELECT id, tag_id FROM posts WHERE tag_id IS NOT NULL
        ON CONFLICT DO NOTHING;
        
        -- Remove tag_id from posts
        ALTER TABLE posts DROP COLUMN tag_id;
    END IF;
END $$;
