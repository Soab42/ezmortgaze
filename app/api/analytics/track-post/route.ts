import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const trackSchema = z.object({
  slug: z.string().min(1),
  event: z.enum(['VIEW', 'TIME']),
  duration: z.number().int().nonnegative().optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validatedData = trackSchema.parse(body)

    const post = await prisma.post.findUnique({
      where: { slug: validatedData.slug },
      select: { id: true }
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    if (validatedData.event === 'VIEW') {
      await prisma.post.update({
        where: { id: post.id },
        data: { viewCount: { increment: 1 } }
      })
    } else if (validatedData.event === 'TIME' && validatedData.duration) {
      // Hard cap single pings to max 60 seconds to prevent malicious injection
      const safeDuration = Math.min(validatedData.duration, 60)
      await prisma.post.update({
        where: { id: post.id },
        data: { readingTimeSpent: { increment: safeDuration } }
      })
    }

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    // Silently fail on analytics tracking errors to not disrupt user experience
    console.error('Analytics tracking failed:', error)
    return new NextResponse(null, { status: 202 })
  }
}
