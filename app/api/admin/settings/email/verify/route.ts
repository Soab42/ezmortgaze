import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json({ error: 'Token is missing' }, { status: 400 })
    }

    const user = await prisma.user.findFirst({
      where: {
        verificationToken: token,
        verificationTokenExpires: {
          gt: new Date(),
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 })
    }

    if (!user.pendingEmail) {
      return NextResponse.json({ error: 'No pending email to verify' }, { status: 400 })
    }

    // Update email
    await prisma.user.update({
      where: { id: user.id },
      data: {
        email: user.pendingEmail,
        pendingEmail: null,
        verificationToken: null,
        verificationTokenExpires: null,
      },
    })

    // Redirect to settings page with success message
    return NextResponse.redirect(new URL('/admin/dashboard/settings?verified=true', req.url))
  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
