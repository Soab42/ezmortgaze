import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await auth()
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const [
      totalArticles,
      publishedArticles,
      pendingComments,
      unreadInquiries,
      totalAuthors,
      totalCategories,
      logs,
      topPosts,
    ] = await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { isPublished: true } }),
      prisma.comment.count({ where: { approved: false } }),
      prisma.contactInquiry.count({ where: { isRead: false } }),
      prisma.author.count(),
      prisma.category.count(),
      prisma.activityLog.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.post.findMany({
        orderBy: { viewCount: 'desc' },
        take: 5,
        select: { id: true, title: true, slug: true, viewCount: true, readingTimeSpent: true, isFeatured: true },
        where: { isPublished: true }
      }),
    ])

    // Map logs to the format expected by the frontend
    const activity = logs.map((log: (typeof logs)[number]) => ({
      id: log.id,
      type: log.entityType.toLowerCase(),
      action: log.action,
      user: log.userName,
      target: log.message,
      date: log.createdAt,
    }))

    return NextResponse.json({
      counts: {
        totalArticles,
        publishedArticles,
        pendingComments,
        unreadInquiries,
        totalAuthors,
        totalCategories,
      },
      activity,
      topPosts
    })
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
