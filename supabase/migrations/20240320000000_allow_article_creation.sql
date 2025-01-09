-- Enable RLS on articles table
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow article creation
CREATE POLICY "Allow public insert access"
ON articles
FOR INSERT
TO anon
USING (true);

-- Create policies for related tables
CREATE POLICY "Allow public insert access"
ON article_faqs
FOR INSERT
TO anon
USING (true);

CREATE POLICY "Allow public insert access"
ON article_locations
FOR INSERT
TO anon
USING (true);

CREATE POLICY "Allow public insert access"
ON article_categories
FOR INSERT
TO anon
USING (true);