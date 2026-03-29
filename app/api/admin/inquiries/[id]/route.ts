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
    const { isRead } = body

    const updatedInquiry = await prisma.contactInquiry.update({
      where: { id },
      data: { isRead: !!isRead },
    })

    // Log the activity
    await logActivity({
      action: 'UPDATE',
      entityType: 'INQUIRY',
      entityId: updatedInquiry.id,
      message: `${session.user.name} marked inquiry from ${updatedInquiry.firstName} ${updatedInquiry.lastName} as ${!!isRead ? 'read' : 'unread'}`,
      userName: session.user.name as string,
      userEmail: session.user.email as string
    })

    return NextResponse.json(updatedInquiry)
  } catch (error) {
    console.error('Failed to update inquiry:', error)
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

    const inquiryToDelete = await prisma.contactInquiry.findUnique({
      where: { id },
      select: { firstName: true, lastName: true }
    })

    if (!inquiryToDelete) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 })
    }

    await prisma.contactInquiry.delete({ where: { id } })

    // Log the activity
    await logActivity({
      action: 'DELETE',
      entityType: 'INQUIRY',
      entityId: id,
      message: `${session.user.name} deleted a contact inquiry from ${inquiryToDelete.firstName} ${inquiryToDelete.lastName}`,
      userName: session.user.name as string,
      userEmail: session.user.email as string
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Failed to delete inquiry:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
