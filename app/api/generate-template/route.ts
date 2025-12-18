import { NextResponse } from "next/server"

async function callOpenAIDirect(prompt: string) {
  const key = process.env.OPENAI_API_KEY
  if (!key) throw new Error('OPENAI_API_KEY not set')

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 800,
    }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`OpenAI responded with ${res.status}: ${body}`)
  }

  const data = await res.json()
  const text = data?.choices?.[0]?.message?.content ?? data?.choices?.[0]?.text
  if (!text) throw new Error('No text in OpenAI response')
  return text
}

export async function POST(request: Request) {
  try {
    const { profession, industry, style, additionalNotes } = await request.json()

    const prompt = `Generate a professional website template configuration for a ${profession} in the ${industry} industry.

Style preference: ${style}
${additionalNotes ? `Additional requirements: ${additionalNotes}` : ""}

Respond with a JSON object containing:
- name: A descriptive template name
- description: A brief description of the template
- category: One of: professional, creative, corporate, portfolio
- config: An object with:
  - colors: { primary: hex color, secondary: hex color, accent: hex color }
  - layout: One of: centered, asymmetric, grid, masonry
  - fonts: { heading: font name, body: font name }

Make sure colors are professional and harmonious. Choose fonts from common web fonts.`

    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY not set')
      return NextResponse.json({ error: 'AI credentials missing', devInfo: 'Set OPENAI_API_KEY in your environment' }, { status: 500 })
    }

    let text: string
    try {
      console.log('Calling OpenAI via OPENAI_API_KEY')
      text = await callOpenAIDirect(prompt)
      console.log('OpenAI response preview:', String(text).slice(0, 1000))
    } catch (err) {
      console.error('Error calling OpenAI:', err)
      return NextResponse.json({ error: 'AI call failed', devInfo: String((err as any)?.message ?? err) }, { status: 500 })
    }

    let templateConfig
    try {
      templateConfig = JSON.parse(text as string)
    } catch (parseErr) {
      const match = (text || '').match(/\{[\s\S]*\}/)
      if (match) {
        try {
          templateConfig = JSON.parse(match[0])
        } catch {
          templateConfig = null
        }
      }

      if (!templateConfig) {
        console.error('Failed to parse AI response as JSON. AI text preview:', String(text).slice(0, 2000))
        templateConfig = {
          name: `${style.charAt(0).toUpperCase() + style.slice(1)} ${industry} Template`,
          description: `AI-generated template for ${profession}`,
          category: "professional",
          config: {
            colors: {
              primary: "#2563eb",
              secondary: "#64748b",
              accent: "#0ea5e9",
            },
            layout: "centered",
            fonts: {
              heading: "Inter",
              body: "Inter",
            },
          },
        }
      }
    }

    const template = {
      id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: templateConfig.name,
      description: templateConfig.description,
      category: templateConfig.category,
      is_ai_generated: true,
      config: templateConfig.config,
    }

    return NextResponse.json({ template })
  } catch (error) {
    console.error('Error in generate-template:', error)
    return NextResponse.json({ error: 'Failed to generate template' }, { status: 500 })
  }
}
