-- Allow admin to delete comments
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'comments' AND policyname = 'Allow admin to delete comments'
    ) THEN
        CREATE POLICY "Allow admin to delete comments"
        ON comments FOR DELETE TO authenticated USING ( auth.jwt() ->> 'email' = 'kcpak4175@gmail.com' );
    END IF;
END $$;
