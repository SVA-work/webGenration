-- Add preview_image_path column to templates to store Supabase storage path
ALTER TABLE templates
    ADD COLUMN IF NOT EXISTS preview_image_path TEXT;

-- Remove legacy columns if present
ALTER TABLE templates
    DROP COLUMN IF EXISTS preview_image_id;

ALTER TABLE templates
    DROP COLUMN IF EXISTS preview_image_url;
