import { NextResponse } from 'next/server'
import { SITE_URL } from '@/lib/config'

export async function GET() {
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/blog',
    '/privacy-policy',
    '/terms-of-use',
  ];

  const urlset = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${SITE_URL}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`

  return new NextResponse(urlset, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
    },
  })
}
