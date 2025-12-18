export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export interface Website {
  id: string
  user_id: string | null
  title: string
  template_id: string
  form_data: Record<string, any>
  status: "draft" | "published" | "archived"
  created_at: string
  updated_at: string
}

export interface Template {
  id: string
  name: string
  description: string | null
  category: string | null
  preview_image_path: string | null
  is_ai_generated: boolean
  config: TemplateConfig
  created_at: string
}

export interface TemplateConfig {
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  layout: string
  fonts: {
    heading: string
    body: string
  }
}

export interface FormResponse {
  id: string
  website_id: string
  step_name: string
  response_data: Record<string, any>
  created_at: string
}

export interface FormData {
  personal: {
    fullName: string
    tagline: string
    bio: string
    profileImage?: string
  }
  contact: {
    email: string
    phone?: string
    location?: string
  }
  social: {
    linkedin?: string
    github?: string
    twitter?: string
    portfolio?: string
  }
  professional: {
    skills: string[]
    services?: string[]
    experience?: Array<{
      title: string
      company: string
      duration: string
    }>
  }
  design: {
    colorScheme?: string
    accentColor?: string
    fontPreference?: string
  }
}
