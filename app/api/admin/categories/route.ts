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

    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

const categorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
})

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { name, slug } = categorySchema.parse(body)

    const existingCategory = await prisma.category.findUnique({
      where: { slug }
    })

    if (existingCategory) {
      return NextResponse.json({ error: 'Category slug already in use' }, { status: 400 })
    }

    const category = await prisma.category.create({
      data: { name, slug }
    })

    await logActivity({
      action: 'CREATE',
      entityType: 'CATEGORY',
      entityId: category.id,
      message: `${session.user.name} created a new category: "${name}"`,
      userName: session.user.name as string,
      userEmail: session.user.email as string
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('Failed to create category:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten().fieldErrors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
