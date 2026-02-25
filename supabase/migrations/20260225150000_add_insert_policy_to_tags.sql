-- Allow authenticated users to insert into tags
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'tags' AND policyname = 'Allow authenticated users to insert tags'
    ) THEN
        CREATE POLICY "Allow authenticated users to insert tags"
        ON tags FOR INSERT TO authenticated WITH CHECK (true);
    END IF;
END $$;
