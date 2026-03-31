import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@/auth'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'EDITOR')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    const [totalLogs, logs] = await Promise.all([
      prisma.activityLog.count(),
      prisma.activityLog.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      })
    ])

    const formattedLogs = logs.map((log) => ({
      id: log.id,
      type: log.entityType.toLowerCase(),
      action: log.action,
      user: log.userName,
      target: log.message,
      date: log.createdAt,
    }))

    return NextResponse.json({
      logs: formattedLogs,
      pagination: {
        total: totalLogs,
        page,
        limit,
        totalPages: Math.ceil(totalLogs / limit),
      }
    })
  } catch (error) {
    console.error('Failed to fetch paginated logs:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
