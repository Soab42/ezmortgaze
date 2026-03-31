import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'
import { z } from 'zod'
import { logActivity } from '@/lib/activity-logger'

const postSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  coverImage: z.string().url().optional().or(z.literal('')),
  readTime: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  canonicalUrl: z.string().url().optional().or(z.literal('')),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  slug: z.string().optional(),
  customHeaderScript: z.string().optional().or(z.literal('')),
  customFooterScript: z.string().optional().or(z.literal('')),
  authorId: z.string(),
  categoryId: z.string(),
})

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const resolvedParams = await params

    const post = await prisma.post.findUnique({
      where: { id: resolvedParams.id },
      include: { author: true, category: true },
    })

    if (!post) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('Failed to fetch post:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const resolvedParams = await params
    const body = await req.json()
    const validatedData = postSchema.parse(body)

    // Ensure empty strings are treated as null if required by DB fields
    const coverImage = validatedData.coverImage === '' ? null : validatedData.coverImage
    const canonicalUrl = validatedData.canonicalUrl === '' ? null : validatedData.canonicalUrl

    const existingPost = await prisma.post.findUnique({ where: { id: resolvedParams.id } })
    if (!existingPost) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 })
    }

    let resolvedSlug = existingPost.slug
    if (validatedData.slug && validatedData.slug.trim() !== '') {
      const formattedSlug = validatedData.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      if (formattedSlug !== existingPost.slug) {
        resolvedSlug = formattedSlug
        let counter = 1
        while (await prisma.post.findFirst({ where: { slug: resolvedSlug, id: { not: resolvedParams.id } } })) {
          resolvedSlug = `${formattedSlug}-${counter}`
          counter++
        }
      }
    }

    const isNowPublished = validatedData.isPublished && !existingPost.isPublished

    const updatedPost = await prisma.post.update({
      where: { id: resolvedParams.id },
      data: {
        ...validatedData,
        slug: resolvedSlug,
        coverImage,
        canonicalUrl,
        updateDate: new Date(),
        ...(isNowPublished && { publishDate: new Date() }),
      },
    })

    // Log the activity
    await logActivity({
      action: isNowPublished ? 'PUBLISH' : 'UPDATE',
      entityType: 'POST',
      entityId: updatedPost.id,
      message: `${session.user.name} ${isNowPublished ? 'published' : 'updated'} the article: "${updatedPost.title}"`,
      userName: session.user.name as string,
      userEmail: session.user.email as string
    })

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error('Failed to update post:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const resolvedParams = await params

    const postToDelete = await prisma.post.findUnique({
      where: { id: resolvedParams.id },
      select: { title: true }
    })

    if (!postToDelete) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 })
    }

    await prisma.post.delete({
      where: { id: resolvedParams.id },
    })

    // Log the activity
    await logActivity({
      action: 'DELETE',
      entityType: 'POST',
      entityId: resolvedParams.id,
      message: `${session.user.name} deleted the article: "${postToDelete.title}"`,
      userName: session.user.name as string,
      userEmail: session.user.email as string
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Failed to delete post:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
