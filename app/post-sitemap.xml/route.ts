import { NextResponse } from 'next/server'
import { SITE_URL } from '@/lib/config'
import prisma from '@/lib/prisma'

export async function GET() {
  const posts = await prisma.post.findMany({
    where: { isPublished: true },
    select: {
      slug: true,
      publishDate: true,
      updateDate: true,
      coverImage: true,
      title: true,
    },
    orderBy: { publishDate: 'desc' },
  });

  const urlset = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${posts.map(post => {
    const lastMod = post.updateDate || post.publishDate || new Date();
    const lastModStr = lastMod instanceof Date ? lastMod.toISOString() : new Date(lastMod).toISOString();
    
    // Handle image URL (Absolute vs Relative)
    let imageUrl = post.coverImage || '';
    if (imageUrl && !imageUrl.startsWith('http')) {
      imageUrl = `${SITE_URL}${imageUrl}`;
    }

    return `
  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${lastModStr}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    ${imageUrl ? `
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title><![CDATA[${post.title}]]></image:title>
    </image:image>` : ''}
  </url>`;
  }).join('')}
</urlset>`

  return new NextResponse(urlset, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
    },
  })
}
