-- Create tags table
CREATE TABLE tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create posts table
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_avatar_url TEXT,
  cover_image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create post_tags junction table
CREATE TABLE post_tags (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Enable RLS
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;

-- Allow public read access to tags
CREATE POLICY "Allow public read access to tags"
ON tags FOR SELECT
TO public
USING (true);

-- Allow public read access to post_tags
CREATE POLICY "Allow public read access to post_tags"
ON post_tags FOR SELECT
TO public
USING (true);

-- Insert seed data for tags
INSERT INTO tags (name) VALUES
  ('React'),
  ('TypeScript'),
  ('CSS'),
  ('Node.js'),
  ('Design Systems'),
  ('DevOps'),
  ('Design'),
  ('Analytics')
ON CONFLICT (name) DO NOTHING;

-- Insert seed data for posts (WITHOUT tag_id)
INSERT INTO posts (title, description, content, author_name, author_avatar_url, cover_image_url, is_featured, created_at)
SELECT
  'Building Scalable Design Systems with Tailwind CSS',
  'Learn how to architect a flexible and maintainable design system that scales with your product needs using utility-first CSS.',
  'Content goes here...',
  'Tom Cook',
  'https://i.pravatar.cc/150?u=tom',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop',
  true,
  '2024-03-14T00:00:00Z'
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE title = 'Building Scalable Design Systems with Tailwind CSS');

INSERT INTO posts (title, description, content, author_name, author_avatar_url, cover_image_url, created_at)
SELECT
  'Mastering React Hooks: Beyond the Basics',
  'Deep dive into useEffect, useMemo, and creating custom hooks for cleaner component logic.',
  'Content goes here...',
  'Lindsay Walton',
  'https://i.pravatar.cc/150?u=lindsay',
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop',
  '2024-03-10T00:00:00Z'
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE title = 'Mastering React Hooks: Beyond the Basics');

INSERT INTO posts (title, description, content, author_name, author_avatar_url, cover_image_url, created_at)
SELECT
  'Understanding TypeScript Generics',
  'A comprehensive guide to writing reusable and type-safe components using generics.',
  'Content goes here...',
  'Hector Gibbons',
  'https://i.pravatar.cc/150?u=hector',
  'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1000&auto=format&fit=crop',
  '2024-03-08T00:00:00Z'
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE title = 'Understanding TypeScript Generics');

INSERT INTO posts (title, description, content, author_name, author_avatar_url, cover_image_url, created_at)
SELECT
  'CSS Grid vs Flexbox: When to use which?',
  'Stop guessing. Here''s a definitive guide on choosing the right layout model for your UI.',
  'Content goes here...',
  'Sarah Jenkins',
  'https://i.pravatar.cc/150?u=sarah',
  'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=1000&auto=format&fit=crop',
  '2024-03-05T00:00:00Z'
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE title = 'CSS Grid vs Flexbox: When to use which?');

INSERT INTO posts (title, description, content, author_name, author_avatar_url, cover_image_url, created_at)
SELECT
  'Optimizing Node.js Performance',
  'Tips and tricks for debugging memory leaks and improving throughput in your Node apps.',
  'Content goes here...',
  'Michael Foster',
  'https://i.pravatar.cc/150?u=michael',
  'https://images.unsplash.com/photo-1627398240309-089a14150a09?q=80&w=1000&auto=format&fit=crop',
  '2024-03-01T00:00:00Z'
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE title = 'Optimizing Node.js Performance');

INSERT INTO posts (title, description, content, author_name, author_avatar_url, cover_image_url, created_at)
SELECT
  'Accessible UI Design Patterns',
  'Ensuring your web applications are usable by everyone. WCAG 2.1 compliance made easy.',
  'Content goes here...',
  'Whitney Francis',
  'https://i.pravatar.cc/150?u=whitney',
  'https://images.unsplash.com/photo-1586528116311-ad8ed7ac3e48?q=80&w=1000&auto=format&fit=crop',
  '2024-02-28T00:00:00Z'
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE title = 'Accessible UI Design Patterns');

INSERT INTO posts (title, description, content, author_name, author_avatar_url, cover_image_url, created_at)
SELECT
  'State Management in 2024',
  'Comparing Redux Toolkit, Zustand, Jotai, and React Context. Which one fits your project?',
  'Content goes here...',
  'Dries Vincent',
  'https://i.pravatar.cc/150?u=dries',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
  '2024-02-25T00:00:00Z'
WHERE NOT EXISTS (SELECT 1 FROM posts WHERE title = 'State Management in 2024');

-- Connect posts to tags in junction table
INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id FROM posts p, tags t WHERE p.title = 'Building Scalable Design Systems with Tailwind CSS' AND t.name = 'Design Systems'
ON CONFLICT DO NOTHING;

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id FROM posts p, tags t WHERE p.title = 'Mastering React Hooks: Beyond the Basics' AND t.name = 'React'
ON CONFLICT DO NOTHING;

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id FROM posts p, tags t WHERE p.title = 'Understanding TypeScript Generics' AND t.name = 'TypeScript'
ON CONFLICT DO NOTHING;

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id FROM posts p, tags t WHERE p.title = 'CSS Grid vs Flexbox: When to use which?' AND t.name = 'CSS'
ON CONFLICT DO NOTHING;

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id FROM posts p, tags t WHERE p.title = 'Optimizing Node.js Performance' AND t.name = 'Node.js'
ON CONFLICT DO NOTHING;

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id FROM posts p, tags t WHERE p.title = 'Accessible UI Design Patterns' AND t.name = 'Design'
ON CONFLICT DO NOTHING;

INSERT INTO post_tags (post_id, tag_id)
SELECT p.id, t.id FROM posts p, tags t WHERE p.title = 'State Management in 2024' AND t.name = 'Analytics'
ON CONFLICT DO NOTHING;
