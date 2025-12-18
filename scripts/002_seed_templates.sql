-- Insert default templates for the website generator
INSERT INTO templates (id, name, description, category, preview_image_path, config) VALUES
(
    'modern-minimal',
    'Modern Minimal',
    'Clean and minimal design perfect for professionals',
    'professional',
    'modern-minimal-professional-website-black-white-cl.jpg',
    '{"colors": {"primary": "#000000", "secondary": "#ffffff", "accent": "#6366f1"}, "layout": "centered", "fonts": {"heading": "Inter", "body": "Inter"}}'
),
(
    'creative-bold',
    'Creative Bold',
    'Bold and vibrant design for creative professionals',
    'creative',
    'creative-bold-colorful-gradient-website-modern.jpg',
    '{"colors": {"primary": "#7c3aed", "secondary": "#ec4899", "accent": "#f59e0b"}, "layout": "asymmetric", "fonts": {"heading": "Poppins", "body": "Open Sans"}}'
),
(
    'corporate-professional',
    'Corporate Professional',
    'Traditional and trustworthy design for corporate use',
    'corporate',
    NULL,
    '{"colors": {"primary": "#1e40af", "secondary": "#64748b", "accent": "#0ea5e9"}, "layout": "grid", "fonts": {"heading": "Roboto", "body": "Roboto"}}'
),
(
    'elegant-portfolio',
    'Elegant Portfolio',
    'Elegant design to showcase your work beautifully',
    'portfolio',
    NULL,
    '{"colors": {"primary": "#0f172a", "secondary": "#cbd5e1", "accent": "#8b5cf6"}, "layout": "masonry", "fonts": {"heading": "Playfair Display", "body": "Lato"}}'
)
ON CONFLICT (id) DO NOTHING;
