-- Create a new storage bucket for article images if it doesn't exist
INSERT INTO storage.buckets (id, name)
SELECT 'article-images', 'article-images'
WHERE NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'article-images'
);

-- Set up public access policy for the bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'article-images');