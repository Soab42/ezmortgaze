"use client"

import { useEffect, useRef } from 'react'

export default function PostAnalyticsTracker({ slug }: { slug: string }) {
  const hasLoggedView = useRef(false)
  const lastActivePing = useRef<number>(Date.now())

  useEffect(() => {
    // 1. Log Initial View
    if (!hasLoggedView.current) {
      hasLoggedView.current = true
      fetch('/api/analytics/track-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, event: 'VIEW' }),
        keepalive: true,
      }).catch(() => {})
    }

    // 2. Track Active Time (Every 10 seconds of active visibility)
    const activePingInterval = 10000 // 10 seconds

    const pingTimeSpent = () => {
      const now = Date.now()
      const diffInSeconds = Math.floor((now - lastActivePing.current) / 1000)

      if (diffInSeconds >= 5 && document.visibilityState === 'visible') {
        fetch('/api/analytics/track-post', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug, event: 'TIME', duration: diffInSeconds }),
          keepalive: true,
        }).catch(() => {})
        
        lastActivePing.current = now
      }
    }

    // Heartbeat every 10 seconds while they remain on the page
    const timer = setInterval(pingTimeSpent, activePingInterval)

    // Flush remaining time when leaving the page explicitly
    const flushTimeOnUnload = () => pingTimeSpent()
    window.addEventListener('beforeunload', flushTimeOnUnload)

    // Handle visibility changes (tab switching)
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        pingTimeSpent() // Flush seconds before they hid the tab
      } else {
        lastActivePing.current = Date.now() // Reset clock when they return
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      clearInterval(timer)
      window.removeEventListener('beforeunload', flushTimeOnUnload)
      document.removeEventListener('visibilitychange', handleVisibility)
      pingTimeSpent()
    }
  }, [slug])

  // Component does not render anything visually
  return null
}
