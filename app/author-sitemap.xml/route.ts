import { NextResponse } from 'next/server'
import { SITE_URL } from '@/lib/config'
import prisma from '@/lib/prisma'

export async function GET() {
  const authors = await prisma.author.findMany({
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  const urlset = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${authors.map(author => `
  <url>
    <loc>${SITE_URL}/author/${author.slug}</loc>
    <lastmod>${author.updatedAt.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`).join('')}
</urlset>`

  return new NextResponse(urlset, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
    },
  })
}
