import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'
import { z } from 'zod'
import { logActivity } from '@/lib/activity-logger'

const postSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  coverImage: z.string().url().optional(),
  readTime: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  canonicalUrl: z.string().url().optional(),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  slug: z.string().optional(),
  customHeaderScript: z.string().optional(),
  customFooterScript: z.string().optional(),
  authorId: z.string(),
  categoryId: z.string(),
})

export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const posts = await prisma.post.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        author: true,
        category: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    const total = await prisma.post.count()

    return NextResponse.json({ posts, total, page, limit })
  } catch (error) {
    console.error('Failed to fetch posts:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = postSchema.parse(body)

    // Generate or use user-provided slug
    const sourceString = validatedData.slug && validatedData.slug.trim() !== "" ? validatedData.slug : validatedData.title
    const baseSlug = sourceString.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    let slug = baseSlug || 'untitled-post'
    let counter = 1
    while (await prisma.post.findUnique({ where: { slug } })) {
      slug = `${baseSlug || 'untitled-post'}-${counter}`
      counter++
    }

    const post = await prisma.post.create({
      data: {
        ...validatedData,
        slug,
        userId: session.user.id as string,
        // Optional dates
        publishDate: validatedData.isPublished ? new Date() : null,
        updateDate: new Date(),
      },
      include: { author: { select: { name: true } } }
    })

    // Log the activity
    await logActivity({
      action: validatedData.isPublished ? 'PUBLISH' : 'CREATE',
      entityType: 'POST',
      entityId: post.id,
      message: `${session.user.name} ${validatedData.isPublished ? 'published' : 'created'} a new article: "${post.title}"`,
      userName: session.user.name as string,
      userEmail: session.user.email as string
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Failed to create post:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
