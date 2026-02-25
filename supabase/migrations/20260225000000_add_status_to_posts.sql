-- Add is_published and published_at columns to posts table
ALTER TABLE posts ADD COLUMN is_published BOOLEAN DEFAULT false;
ALTER TABLE posts ADD COLUMN published_at TIMESTAMP WITH TIME ZONE;

-- Update existing posts to be published
UPDATE posts SET is_published = true, published_at = created_at;
