import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'
import { z } from 'zod'
import { logActivity } from '@/lib/activity-logger'

const authorSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().min(1),
  avatar: z.string().url().optional().or(z.literal('')),
  twitter: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
})

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await req.json()
    const { name, slug, role, bio, avatar, twitter, linkedin } = authorSchema.parse(body)

    const existingAuthor = await prisma.author.findUnique({ where: { id } })
    if (!existingAuthor) {
      return NextResponse.json({ error: 'Author not found' }, { status: 404 })
    }

    // Check if slug taken by someone else
    if (slug !== existingAuthor.slug) {
      const slugTaken = await prisma.author.findUnique({ where: { slug } })
      if (slugTaken) {
        return NextResponse.json({ error: 'Slug already in use' }, { status: 400 })
      }
    }

    const updatedAuthor = await prisma.author.update({
      where: { id },
      data: { 
        name, slug, role, bio, 
        avatar: avatar || null, 
        twitter: twitter || null, 
        linkedin: linkedin || null 
      },
    })

    await logActivity({
      action: 'UPDATE',
      entityType: 'AUTHOR',
      entityId: updatedAuthor.id,
      message: `${session.user.name} updated the profile for author: "${name}"`,
      userName: session.user.name as string,
      userEmail: session.user.email as string
    })

    return NextResponse.json(updatedAuthor)
  } catch (error) {
    console.error('Failed to update author:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const authorToDelete = await prisma.author.findUnique({
      where: { id },
      select: { name: true }
    })

    if (!authorToDelete) {
      return NextResponse.json({ error: 'Author not found' }, { status: 404 })
    }

    // Check if author has posts
    const postsCount = await prisma.post.count({ where: { authorId: id } })
    if (postsCount > 0) {
      return NextResponse.json({ error: 'Cannot delete author with active posts' }, { status: 400 })
    }

    await prisma.author.delete({ where: { id } })

    await logActivity({
      action: 'DELETE',
      entityType: 'AUTHOR',
      entityId: id,
      message: `${session.user.name} deleted the author profile: "${authorToDelete.name}"`,
      userName: session.user.name as string,
      userEmail: session.user.email as string
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Failed to delete author:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
