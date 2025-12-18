import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import type { FormData, Template } from "@/lib/types/database"

export async function POST(request: Request) {
  try {
    console.log('/api/generate-website: received request')
    const { templateId, formData } = (await request.json()) as {
      templateId: string
      formData: Partial<FormData>
    }

    console.log('/api/generate-website: payload', { templateId, formDataPreview: JSON.stringify(formData || {}).slice(0, 2000) })


    console.log('/api/generate-website: template fetching from DB', templateId)
    const supabase = await getSupabaseServerClient()

    let { data: dbTemplate, error: templateError } = await supabase
      .from("templates")
      .select("*")
      .eq("id", templateId)
      .single()

    if (templateError || !dbTemplate) {
      const result = await supabase
        .from("ai_templates")
        .select("*")
        .eq("id", templateId)
        .single()

      dbTemplate = result.data
      templateError = result.error

      if (templateError || !dbTemplate) {
        throw new Error("Template not found")
      }
    }

    const template = dbTemplate


    const websiteFiles = generateWebsiteFiles(template, formData)

    const { data: website, error: websiteError } = await supabase
      .from("websites")
      .insert({
        title: formData.personal?.fullName || "My Website",
        template_id: templateId,
        form_data: formData,
        status: "published",
      })
      .select()
      .single()

    if (websiteError) {
      console.error("Error saving website:", websiteError)
    }

    return NextResponse.json({
      files: websiteFiles,
      websiteId: website?.id,
    })
  } catch (error) {
    console.error("Error generating website:", error)
    return NextResponse.json({ error: "Failed to generate website" }, { status: 500 })
  }
}

function generateWebsiteFiles(template: Template, formData: Partial<FormData>) {
  const colors = template.config.colors
  const fonts = template.config.fonts

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formData.personal?.fullName || "My Website"}</title>
    <meta name="description" content="${formData.personal?.tagline || "Professional website"}">
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=${fonts.heading.replace(" ", "+")}:wght@400;700&family=${fonts.body.replace(" ", "+")}:wght@400;500&display=swap" rel="stylesheet">
</head>
<body>
    <header>
        <div class="container">
            <h1>${formData.personal?.fullName || "Your Name"}</h1>
            <p class="tagline">${formData.personal?.tagline || "Your Professional Tagline"}</p>
        </div>
    </header>
    
    <main>
        <section class="about">
            <div class="container">
                <h2>About Me</h2>
                <p>${formData.personal?.bio || "Your professional bio goes here."}</p>
            </div>
        </section>
        
        ${
          formData.professional?.skills && formData.professional.skills.length > 0
            ? `
        <section class="skills">
            <div class="container">
                <h2>Skills</h2>
                <div class="skills-grid">
                    ${formData.professional.skills.map((skill) => `<span class="skill-badge">${skill}</span>`).join("")}
                </div>
            </div>
        </section>
        `
            : ""
        }
        
        ${
          formData.professional?.portfolio && formData.professional.portfolio.length > 0
            ? `
        <section class="portfolio">
            <div class="container">
                <h2>Portfolio</h2>
                <div class="portfolio-grid">
                    ${formData.professional.portfolio
                      .map(
                        (item) => `
                        <div class="portfolio-item">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                            ${item.url ? `<a href="${item.url}" target="_blank">View Project →</a>` : ""}
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            </div>
        </section>
        `
            : ""
        }
        
        <section class="contact">
            <div class="container">
                <h2>Get In Touch</h2>
                <div class="contact-info">
                    ${formData.contact?.email ? `<p>Email: <a href="mailto:${formData.contact.email}">${formData.contact.email}</a></p>` : ""}
                    ${formData.contact?.phone ? `<p>Phone: ${formData.contact.phone}</p>` : ""}
                    ${formData.contact?.location ? `<p>Location: ${formData.contact.location}</p>` : ""}
                </div>
                ${
                  formData.social &&
                  (
                    formData.social.linkedin ||
                      formData.social.github ||
                      formData.social.twitter ||
                      formData.social.portfolio
                  )
                    ? `
                <div class="social-links">
                    ${formData.social.linkedin ? `<a href="${formData.social.linkedin}" target="_blank" rel="noopener">LinkedIn</a>` : ""}
                    ${formData.social.github ? `<a href="${formData.social.github}" target="_blank" rel="noopener">GitHub</a>` : ""}
                    ${formData.social.twitter ? `<a href="${formData.social.twitter}" target="_blank" rel="noopener">Twitter</a>` : ""}
                    ${formData.social.portfolio ? `<a href="${formData.social.portfolio}" target="_blank" rel="noopener">Portfolio</a>` : ""}
                </div>
                `
                    : ""
                }
            </div>
        </section>
    </main>
    
    <footer>
        <div class="container">
            <p>&copy; ${new Date().getFullYear()} ${formData.personal?.fullName || "Your Name"}. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`

  const css = `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: '${fonts.body}', sans-serif;
    line-height: 1.6;
    color: #333;
}

h1, h2, h3 {
    font-family: '${fonts.heading}', sans-serif;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

header {
    background: ${colors.primary};
    color: white;
    padding: 80px 0;
    text-align: center;
}

header h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.tagline {
    font-size: 1.25rem;
    opacity: 0.9;
}

section {
    padding: 60px 0;
}

section:nth-child(even) {
    background: #f9fafb;
}

h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: ${colors.primary};
}

.about p {
    font-size: 1.1rem;
    max-width: 800px;
    margin: 0 auto;
}

.skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
}

.skill-badge {
    background: ${colors.accent};
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.9rem;
}

.portfolio-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.portfolio-item {
    background: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.portfolio-item h3 {
    color: ${colors.primary};
    margin-bottom: 1rem;
}

.portfolio-item p {
    margin-bottom: 1rem;
}

.portfolio-item a {
    color: ${colors.primary};
    text-decoration: none;
    font-weight: 500;
}

.contact-info {
    margin-bottom: 2rem;
    text-align: center;
}

.contact-info p {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
}

.contact-info a {
    color: ${colors.primary};
    text-decoration: none;
}

.social-links {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    justify-content: center;
}

.social-links a {
    background: ${colors.primary};
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    transition: opacity 0.3s;
}

.social-links a:hover {
    opacity: 0.8;
}

footer {
    background: #1f2937;
    color: white;
    padding: 30px 0;
    text-align: center;
}

@media (max-width: 768px) {
    header h1 {
        font-size: 2rem;
    }
    
    h2 {
        font-size: 1.5rem;
    }
    
    .portfolio-grid {
        grid-template-columns: 1fr;
    }
}`

  const readme = `# ${formData.personal?.fullName || "My Website"}

This is your professional business card website generated by WebGen.

## Quick Start

Simply open \`index.html\` in your web browser to view your website locally.

## Deployment Instructions

### Option 1: Vercel (Recommended)
1. Install Vercel CLI: \`npm i -g vercel\`
2. Run \`vercel\` in this directory
3. Follow the prompts

### Option 2: Netlify
1. Drag and drop this folder to [Netlify Drop](https://app.netlify.com/drop)
2. Your site is live!

### Option 3: GitHub Pages
1. Create a new GitHub repository
2. Push these files to the repository
3. Go to Settings → Pages
4. Select your branch and save

### Option 4: Any Web Host
Upload all files to your web hosting via FTP or control panel.

## Files Included
- \`index.html\` - Main HTML file
- \`styles.css\` - Stylesheet
- \`README.md\` - This file

## Customization
Feel free to edit the HTML and CSS files to further customize your website.

## Technology Stack
- Pure HTML5
- CSS3
- Google Fonts
- Responsive Design

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License
© ${new Date().getFullYear()} ${formData.personal?.fullName || ""}. All rights reserved.
`

  return {
    "index.html": html,
    "styles.css": css,
    "README.md": readme,
  }
}
