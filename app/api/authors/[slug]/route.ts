import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const author = await prisma.author.findUnique({
      where: { slug },
      include: {
        posts: {
          where: { isPublished: true },
          select: {
            title: true,
            slug: true,
            excerpt: true,
            coverImage: true,
            publishDate: true,
            createdAt: true,
          },
          orderBy: { publishDate: 'desc' },
        },
      },
    })

    if (!author) {
      return NextResponse.json({ error: 'Author not found' }, { status: 404 })
    }

    return NextResponse.json(author)
  } catch (error) {
    console.error('Failed to fetch author:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
