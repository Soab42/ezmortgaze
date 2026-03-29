import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'
import { logActivity } from '@/lib/activity-logger'

export async function POST() {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if we already have logs to avoid double migration
    const logCount = await prisma.activityLog.count()
    if (logCount > 0) {
      // Optional: uncomment if you want to prevent multiple runs
      // return NextResponse.json({ message: 'Migration already performed' })
    }

    const [posts, comments, inquiries] = await Promise.all([
      prisma.post.findMany({ include: { author: true } }),
      prisma.comment.findMany(),
      prisma.contactInquiry.findMany(),
    ])

    let migratedCount = 0

    // Migrate Posts
    for (const post of posts) {
      await logActivity({
        action: 'CREATE',
        entityType: 'POST',
        entityId: post.id,
        message: `Historical record: Article "${post.title}" was registered in the system.`,
        userName: post.author?.name || 'System',
        userEmail: 'system@ezmortgaze.com',
        createdAt: post.createdAt // Now supported by the logger
      })
      migratedCount++
    }

    // Migrate Comments
    for (const comment of comments) {
      await logActivity({
        action: 'RECEIVE',
        entityType: 'COMMENT',
        entityId: comment.id,
        message: `Historical record: Comment from ${comment.name} was registered.`,
        userName: comment.name,
        userEmail: comment.email,
        createdAt: comment.createdAt
      })
      migratedCount++
    }

    // Migrate Inquiries
    for (const inquiry of inquiries) {
      await logActivity({
        action: 'RECEIVE',
        entityType: 'INQUIRY',
        entityId: inquiry.id,
        message: `Historical record: Inquiry from ${inquiry.firstName} ${inquiry.lastName} was registered.`,
        userName: `${inquiry.firstName} ${inquiry.lastName}`,
        userEmail: inquiry.email,
        createdAt: inquiry.createdAt
      })
      migratedCount++
    }

    return NextResponse.json({ 
      success: true, 
      message: `Migrated ${migratedCount} historical records to the activity log.` 
    })
  } catch (error) {
    console.error('Migration failed:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
