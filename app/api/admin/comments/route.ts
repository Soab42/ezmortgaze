import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'

export async function GET() {
  try {
    const session = await auth()
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const comments = await prisma.comment.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        post: {
          select: { title: true, slug: true },
        },
      },
    })

    return NextResponse.json(comments)
  } catch (error) {
    console.error('Failed to fetch admin comments:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
