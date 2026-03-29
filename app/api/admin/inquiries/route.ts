import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'

export async function GET() {
  try {
    const session = await auth()
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const inquiries = await prisma.contactInquiry.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(inquiries)
  } catch (error) {
    console.error('Failed to fetch inquiries:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
