import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { logActivity } from '@/lib/activity-logger'

const inquirySchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { firstName, lastName, email, message } = inquirySchema.parse(body)

    const inquiry = await prisma.contactInquiry.create({
      data: {
        firstName,
        lastName,
        email,
        message,
        isRead: false,
      },
    })

    // Log the activity
    await logActivity({
      action: 'RECEIVE',
      entityType: 'INQUIRY',
      entityId: inquiry.id,
      message: `A new contact inquiry was received from ${firstName} ${lastName}`,
      userName: `${firstName} ${lastName}`,
      userEmail: email
    })

    return NextResponse.json(inquiry, { status: 201 })
  } catch (error) {
    console.error('Failed to submit contact inquiry:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
