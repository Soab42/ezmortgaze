import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'
import { logActivity } from '@/lib/activity-logger'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await req.json()
    const { approved } = body

    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { approved: !!approved },
      include: { post: { select: { title: true } } }
    })

    // Log the activity
    await logActivity({
      action: !!approved ? 'APPROVE' : 'UPDATE',
      entityType: 'COMMENT',
      entityId: updatedComment.id,
      message: `${session.user.name} ${!!approved ? 'approved' : 'rejected'} a comment from ${updatedComment.name} on "${updatedComment.post.title}"`,
      userName: session.user.name as string,
      userEmail: session.user.email as string
    })

    return NextResponse.json(updatedComment)
  } catch (error) {
    console.error('Failed to update comment:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const commentToDelete = await prisma.comment.findUnique({
      where: { id },
      select: { name: true, post: { select: { title: true } } }
    })

    if (!commentToDelete) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 })
    }

    await prisma.comment.delete({ where: { id } })

    // Log the activity
    await logActivity({
      action: 'DELETE',
      entityType: 'COMMENT',
      entityId: id,
      message: `${session.user.name} deleted a comment from ${commentToDelete.name} on "${commentToDelete.post.title}"`,
      userName: session.user.name as string,
      userEmail: session.user.email as string
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Failed to delete comment:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
