import { NextResponse } from 'next/server'
import { SITE_URL } from '@/lib/config'
import prisma from '@/lib/prisma'

export async function GET() {
  const lastPost = await prisma.post.findFirst({
    where: { isPublished: true },
    orderBy: { updateDate: 'desc' },
    select: { updateDate: true, publishDate: true }
  });

  const lastMod = lastPost?.updateDate || lastPost?.publishDate || new Date();
  const lastModStr = lastMod instanceof Date ? lastMod.toISOString() : new Date(lastMod).toISOString();

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/page-sitemap.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/post-sitemap.xml</loc>
    <lastmod>${lastModStr}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/category-sitemap.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/author-sitemap.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
</sitemapindex>`

  return new NextResponse(sitemapIndex, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
    },
  })
}
