-- Add cover_image_url column to posts table
ALTER TABLE posts ADD COLUMN IF NOT EXISTS cover_image_url TEXT;

-- Update existing posts with concrete images
UPDATE posts SET cover_image_url = 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop' WHERE title = 'Building Scalable Design Systems with Tailwind CSS';
UPDATE posts SET cover_image_url = 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop' WHERE title = 'Mastering React Hooks: Beyond the Basics';
UPDATE posts SET cover_image_url = 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1000&auto=format&fit=crop' WHERE title = 'Understanding TypeScript Generics';
UPDATE posts SET cover_image_url = 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=1000&auto=format&fit=crop' WHERE title = 'CSS Grid vs Flexbox: When to use which?';
UPDATE posts SET cover_image_url = 'https://images.unsplash.com/photo-1627398240309-089a14150a09?q=80&w=1000&auto=format&fit=crop' WHERE title = 'Optimizing Node.js Performance';
UPDATE posts SET cover_image_url = 'https://images.unsplash.com/photo-1586528116311-ad8ed7ac3e48?q=80&w=1000&auto=format&fit=crop' WHERE title = 'Accessible UI Design Patterns';
UPDATE posts SET cover_image_url = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop' WHERE title = 'State Management in 2024';
