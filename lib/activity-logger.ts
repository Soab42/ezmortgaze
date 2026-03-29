import prisma from './prisma'

type ActivityType = 'CREATE' | 'UPDATE' | 'DELETE' | 'PUBLISH' | 'RECEIVE' | 'APPROVE'
type EntityType = 'POST' | 'COMMENT' | 'INQUIRY' | 'CATEGORY' | 'AUTHOR' | 'USER'

interface LogOptions {
  action: ActivityType
  entityType: EntityType
  entityId?: string
  message: string
  userName: string
  userEmail?: string
  createdAt?: Date
}

export async function logActivity({
  action,
  entityType,
  entityId,
  message,
  userName,
  userEmail,
  createdAt
}: LogOptions) {
  try {
    // Non-blocking call to Prisma to record activity
    // We don't necessarily want to wait for this to finish before returning the API response
    // but in some serverless environments, it's safer to await it.
    await prisma.activityLog.create({
      data: {
        action,
        entityType,
        entityId,
        message,
        userName,
        userEmail,
        createdAt: createdAt || new Date()
      }
    })
  } catch (error) {
    console.error('Failed to log activity:', error)
  }
}
