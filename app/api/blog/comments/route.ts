import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { logActivity } from '@/lib/activity-logger'

const commentSchema = z.object({
  postId: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  content: z.string().min(1),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { postId, name, email, content } = commentSchema.parse(body)

    const comment = await prisma.comment.create({
      data: {
        postId,
        name,
        email,
        content,
        approved: false, // Default to false for moderation
      },
      include: { post: { select: { title: true } } }
    })

    // Log the activity
    await logActivity({
      action: 'RECEIVE',
      entityType: 'COMMENT',
      entityId: comment.id,
      message: `A new comment was received from ${name} on "${comment.post.title}"`,
      userName: name,
      userEmail: email
    })

    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    console.error('Failed to submit comment:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    const post = await prisma.post.findUnique({
      where: { slug },
      select: { id: true },
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const comments = await prisma.comment.findMany({
      where: {
        postId: post.id,
        approved: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(comments)
  } catch (error) {
    console.error('Failed to fetch comments:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
