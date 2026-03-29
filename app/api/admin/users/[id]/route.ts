import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'
import bcrypt from 'bcryptjs'
import { logActivity } from '@/lib/activity-logger'

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
    const { name, email, password, role } = body

    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if new email is already taken by someone else
    if (email && email !== user.email) {
      const existingEmail = await prisma.user.findUnique({ where: { email } })
      if (existingEmail) {
        return NextResponse.json({ error: 'Email already in use' }, { status: 400 })
      }
    }

    const updatedData: any = {
      name: name ?? user.name,
      email: email ?? user.email,
      role: role ?? user.role,
    }

    if (password && password.trim() !== '') {
      updatedData.password = await bcrypt.hash(password, 10)
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updatedData,
      select: { id: true, email: true, name: true, role: true, createdAt: true }
    })

    await logActivity({
      action: 'UPDATE',
      entityType: 'USER',
      entityId: updatedUser.id,
      message: `${session.user.name} updated the account for: "${updatedUser.email}"`,
      userName: session.user.name as string,
      userEmail: session.user.email as string
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Failed to update user:', error)
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

    const userToDelete = await prisma.user.findUnique({
      where: { id },
      select: { email: true }
    })

    if (!userToDelete) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Prevent deleting self
    if (id === session.user.id) {
      return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 })
    }

    await prisma.user.delete({ where: { id } })

    await logActivity({
      action: 'DELETE',
      entityType: 'USER',
      entityId: id,
      message: `${session.user.name} deleted the user account: "${userToDelete.email}"`,
      userName: session.user.name as string,
      userEmail: session.user.email as string
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Failed to delete user:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
