import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
    const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
    const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET || process.env.NEXT_PUBLIC_SUPABASE_BUCKET

    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY || !SUPABASE_BUCKET) {
      return NextResponse.json({ error: 'Supabase not configured for proxy' }, { status: 501 })
    }

    const objectUrl = `${SUPABASE_URL.replace(/\/$/, '')}/storage/v1/object/public/${SUPABASE_BUCKET}/${encodeURIComponent(id)}`

    const res = await fetch(objectUrl, {
      headers: {
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      },
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch object from Supabase', status: res.status }, { status: 502 })
    }

    const arrayBuffer = await res.arrayBuffer()
    const contentType = res.headers.get('content-type') || 'application/octet-stream'

    return new NextResponse(Buffer.from(arrayBuffer), {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (err) {
    console.error('Error in images proxy route:', err)
    return NextResponse.json({ error: 'Failed to proxy image' }, { status: 500 })
  }
}
