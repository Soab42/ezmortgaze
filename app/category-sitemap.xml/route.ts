import { NextResponse } from 'next/server'
import { SITE_URL } from '@/lib/config'
import prisma from '@/lib/prisma'

export async function GET() {
  const categories = await prisma.category.findMany({
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  // Note: Currently we don't have a category detail page, but standard practice is /blog?category=slug
  // If you have /category/[slug], update the loc accordingly.
  const urlset = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${categories.map(cat => `
  <url>
    <loc>${SITE_URL}/blog?category=${cat.slug}</loc>
    <lastmod>${cat.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
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
