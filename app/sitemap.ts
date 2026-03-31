import { MetadataRoute } from 'next'
import { blogPosts } from '@/data/blogs'
import { SITE_URL } from '@/lib/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL

  const blogs = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updateDate || post.publishDate || new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const staticPages = [
    '',
    '/about',
    '/contact',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.9,
  }))

  return [...staticPages, ...blogs]
}
