-- Migration to fix broken Unsplash image URLs
-- Reference: Identifying 404 image URLs and replacing them with valid ones found on Unsplash.

-- Update "Optimizing Node.js Performance"
UPDATE posts SET cover_image_url = 'https://images.unsplash.com/photo-1558486012-817176f84c6d?q=80&w=1000&auto=format&fit=crop' WHERE title = 'Optimizing Node.js Performance';

-- Update "Accessible UI Design Patterns"
UPDATE posts SET cover_image_url = 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1000&auto=format&fit=crop' WHERE title = 'Accessible UI Design Patterns';
