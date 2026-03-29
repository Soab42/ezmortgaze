import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'
import { z } from 'zod'
import { logActivity } from '@/lib/activity-logger'

export async function GET() {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const authors = await prisma.author.findMany({
      orderBy: { name: 'asc' },
    })

    return NextResponse.json(authors)
  } catch (error) {
    console.error('Failed to fetch authors:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

const authorSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().min(1),
  avatar: z.string().url().optional().or(z.literal('')),
  twitter: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
})

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { name, slug, role, bio, avatar, twitter, linkedin } = authorSchema.parse(body)

    const existingAuthor = await prisma.author.findUnique({
      where: { slug }
    })

    if (existingAuthor) {
      return NextResponse.json({ error: 'Author slug already in use' }, { status: 400 })
    }

    const author = await prisma.author.create({
      data: { 
        name, 
        slug,
        role,
        bio,
        avatar: avatar || null,
        twitter: twitter || null,
        linkedin: linkedin || null
      }
    })

    await logActivity({
      action: 'CREATE',
      entityType: 'AUTHOR',
      entityId: author.id,
      message: `${session.user.name} added a new author: "${name}"`,
      userName: session.user.name as string,
      userEmail: session.user.email as string
    })

    return NextResponse.json(author, { status: 201 })
  } catch (error) {
    console.error('Failed to create author:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten().fieldErrors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
