import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'
import { z } from 'zod'
import { logActivity } from '@/lib/activity-logger'

const categorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
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
    const { name, slug } = categorySchema.parse(body)

    const existingCategory = await prisma.category.findUnique({ where: { id } })
    if (!existingCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    // Check if slug is taken by someone else
    if (slug !== existingCategory.slug) {
      const slugTaken = await prisma.category.findUnique({ where: { slug } })
      if (slugTaken) {
        return NextResponse.json({ error: 'Slug already in use' }, { status: 400 })
      }
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name, slug },
    })

    await logActivity({
      action: 'UPDATE',
      entityType: 'CATEGORY',
      entityId: updatedCategory.id,
      message: `${session.user.name} updated category to: "${name}"`,
      userName: session.user.name as string,
      userEmail: session.user.email as string
    })

    return NextResponse.json(updatedCategory)
  } catch (error) {
    console.error('Failed to update category:', error)
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

    const categoryToDelete = await prisma.category.findUnique({
      where: { id },
      select: { name: true }
    })

    if (!categoryToDelete) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 })
    }

    // Check if category has posts
    const postsCount = await prisma.post.count({ where: { categoryId: id } })
    if (postsCount > 0) {
      return NextResponse.json({ error: 'Cannot delete category with active posts' }, { status: 400 })
    }

    await prisma.category.delete({ where: { id } })

    await logActivity({
      action: 'DELETE',
      entityType: 'CATEGORY',
      entityId: id,
      message: `${session.user.name} deleted category: "${categoryToDelete.name}"`,
      userName: session.user.name as string,
      userEmail: session.user.email as string
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Failed to delete category:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
