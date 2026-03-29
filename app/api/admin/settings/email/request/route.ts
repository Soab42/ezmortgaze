import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'
import { z } from 'zod'
import { randomBytes } from 'crypto'
import { sendVerificationEmail } from '@/lib/mail'

const emailRequestSchema = z.object({
  newEmail: z.string().email(),
})

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    if (!userId) {
      return NextResponse.json({ error: 'User ID missing in session' }, { status: 400 })
    }

    const body = await req.json()
    const { newEmail } = emailRequestSchema.parse(body)

    // Check if email already in use by someone else
    const existingUser = await prisma.user.findUnique({
      where: { email: newEmail },
    })

    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 })
    }

    // Generate secure token
    const token = randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 3600000) // 1 hour

    // Save token to user
    await prisma.user.update({
      where: { id: userId },
      data: {
        verificationToken: token,
        verificationTokenExpires: expires,
        pendingEmail: newEmail,
      },
    })

    // Send email
    await sendVerificationEmail(newEmail, token)

    return NextResponse.json({ success: true, message: 'Verification email sent' })
  } catch (error) {
    console.error('Email reset request error:', error)
    if (error instanceof z.ZodError) {
       return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
