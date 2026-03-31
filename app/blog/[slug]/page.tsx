import { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import CommentSection from "@/components/blog/CommentSection";
import { ArrowLeft, Calendar, Clock, RefreshCw, Share2, Twitter, Linkedin } from "lucide-react";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import PostAnalyticsTracker from "@/components/blog/PostAnalyticsTracker";
import ShareButtons from "@/components/blog/ShareButtons";
import { SITE_URL, OG_IMAGE, LOGO } from "@/lib/config";

type Props = {
  params: Promise<{ slug: string }>
};

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await prisma.post.findUnique({
    where: { slug: resolvedParams.slug },
    include: { author: true }
  });

  if (!post) {
    return { title: 'Post Not Found | EZMortgageLender.com®' };
  }

  const canonicalUrl = post.canonicalUrl || `${SITE_URL}/blog/${post.slug}`;

  return {
    title: {
      absolute: post.metaTitle || `${post.title} | EZMortgageLender`,
    },
    description: post.metaDescription || post.excerpt,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: "article",
      publishedTime: post.publishDate?.toISOString() || post.createdAt.toISOString(),
      modifiedTime: post.updateDate?.toISOString() || post.updatedAt.toISOString(),
      authors: [post.author.name],
      url: canonicalUrl,
      images: [{
        url: post.coverImage ? `${post.coverImage}` : OG_IMAGE,
        width: 1200,
        height: 630,
        alt: post.title,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: [post.coverImage?.startsWith('http') ? post.coverImage : `${post.coverImage || '/placeholder.jpg'}`],
    },
    robots: { index: post.isPublished, follow: post.isPublished }
  };
}

export default async function BlogDetails({ params }: Props) {
  const resolvedParams = await params;
  const session = await auth();
  const isAdmin = session?.user?.role === 'ADMIN' || session?.user?.role === 'EDITOR';

  const post = await prisma.post.findUnique({
    where: { slug: resolvedParams.slug },
    include: { author: true, category: true }
  });

  if (!post || (!post.isPublished && !isAdmin)) {
    notFound();
  }

  const relatedPosts = await prisma.post.findMany({
    where: { isPublished: true, slug: { not: post.slug } },
    take: 2,
    include: { category: true },
    orderBy: { publishDate: 'desc' }
  });

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    image: post.coverImage ? `${SITE_URL}${post.coverImage}` : `${SITE_URL}/placeholder.jpg`,
    author: {
      "@type": "Person",
      name: post.author.name,
      url: `${SITE_URL}/author/${post.author.slug}`
    },
    publisher: {
      "@type": "Organization",
      name: "EZMortgageLender.com®",
      logo: { "@type": "ImageObject", url: LOGO }
    },
    datePublished: post.publishDate || post.createdAt,
    dateModified: post.updateDate || post.updatedAt,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` }
    ]
  };

  const publishFormatted = new Date(post.publishDate || post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const updateFormatted = new Date(post.updateDate || post.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const wasUpdated = (post.publishDate?.getTime() !== post.updateDate?.getTime());

  return (
    <>
      {!isAdmin && <PostAnalyticsTracker slug={post.slug} />}
      {post.customHeaderScript && (
        <div dangerouslySetInnerHTML={{ __html: post.customHeaderScript }} />
      )}
      <main className="relative min-h-screen bg-[#020610]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Navbar />

      {/* Article Hero */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={post.coverImage || "/placeholder.jpg"}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#020610]/40 to-[#020610]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 px-6 w-full">
          {/* Breadcrumbs */}
            <div className="mb-6 text-shadow-sm">
            <Breadcrumbs items={[
              { label: "Blog", href: "/blog" },
              { label: post.category?.name || "Uncategorized", href: "/blog" },
              { label: post.title },
            ]} />
          </div>

          <div className="flex flex-col items-start gap-6 mb-8">
            <Link
              href="/blog"
                className="group inline-flex items-center gap-2 text-amber-500 text-sm font-bold hover:gap-4 transition-all text-shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Insights
            </Link>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500 text-zinc-950 text-[11px] font-black uppercase tracking-[0.2em] shadow-lg">
              {post.category?.name || "Uncategorized"}
            </div>
          </div>

            <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter mb-8 text-shadow-md">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-zinc-400 text-sm border-t border-white/10 pt-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-amber-500 font-black text-sm overflow-hidden relative shrink-0 border border-white/10">
                {post.author.avatar ? (
                  <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                ) : (
                  post.author.name.split(" ").map((n: string) => n[0]).join("")
                )}
              </div>
              <div>
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest leading-none mb-1">Written By</p>
                <Link href={`/author/${post.author.slug}`} className="text-white font-bold hover:text-amber-400 transition-colors block">
                  {post.author.name}
                </Link>
              </div>
            </div>
            <div className="h-10 w-px bg-white/10 hidden sm:block" />
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Published</p>
                  <time dateTime={post.publishDate?.toISOString()} className="font-medium text-zinc-300">{publishFormatted}</time>
                </div>
              </div>
              {wasUpdated && (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div>
                    <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Updated</p>
                    <time dateTime={post.updateDate?.toISOString()} className="font-medium text-emerald-400">{updateFormatted}</time>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-medium">{post.readTime || "5 min read"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-16">

            {/* Main Article Body */}
            <div className="flex-1 min-w-0">
              <div
                className="prose prose-invert prose-amber max-w-none prose-p:text-zinc-400 prose-p:leading-[1.8] prose-p:text-lg prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight text-white mb-20"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Author Bio Section */}
              <div className="mt-20 p-8 md:p-10 rounded-3xl border border-white/5 bg-white/2 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-amber-500/10 transition-all duration-700" />
                
                <div className="flex flex-col md:flex-row gap-8 relative z-10">
                  <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center text-amber-500 font-black text-2xl shrink-0 overflow-hidden relative border border-white/10">
                    {post.author.avatar ? (
                      <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                    ) : (
                      post.author.name.split(" ").map((n: string) => n[0]).join("")
                    )}
                  </div>
                  
                  <div>
                    <div className="flex flex-col mb-4">
                      <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">About the Author</span>
                      <Link href={`/author/${post.author.slug}`} className="text-2xl font-black text-white hover:text-amber-400 transition-colors">
                        {post.author.name}
                      </Link>
                      <span className="text-zinc-500 text-xs font-bold">{post.author.role}</span>
                    </div>
                    
                    <p className="text-zinc-400 leading-relaxed mb-6 italic text-sm md:text-base">
                      "{post.author.bio}"
                    </p>
                    
                    <div className="flex items-center gap-4">
                      {post.author.twitter && (
                        <a href={post.author.twitter} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                           <Twitter className="w-4 h-4" />
                        </a>
                      )}
                      {post.author.linkedin && (
                        <a href={post.author.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                           <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      <Link href={`/author/${post.author.slug}`} className="ml-auto text-amber-500 text-xs font-bold hover:underline">
                        View Profile & Articles
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comment Section */}
              <CommentSection postId={post.id} slug={post.slug} />

              <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                <ShareButtons
                  url={`${SITE_URL}/blog/${post.slug}`}
                  title={post.title}
                />
                <div className="flex gap-2 flex-wrap">
                  {["#CommercialRE", "#FinTech", "#AI"].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-lg bg-zinc-950 border border-white/5 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Sidebar */}
            <aside className="w-full lg:w-72 shrink-0 space-y-6">
              <div className="sticky top-28 space-y-6">

                {/* Table of Contents */}
                <TableOfContents />

                {/* Related Insights */}
                <div className="glass-panel p-8 rounded-3xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                  <h3 className="text-xl font-bold text-white mb-6">Related Insights</h3>
                  <div className="space-y-6">
                    {relatedPosts.map((rp: (typeof relatedPosts)[number]) => (
                      <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block">
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2">{rp.category?.name}</p>
                        <h4 className="text-white font-bold group-hover:text-amber-500 transition-colors leading-tight mb-4 line-clamp-2">
                          {rp.title}
                        </h4>
                        <div className="h-px w-full bg-white/5" />
                      </Link>
                    ))}
                  </div>
                  <Link href="/blog" className="mt-8 block text-center py-3 rounded-xl border border-white/10 text-white text-sm font-bold hover:bg-white/5 transition-colors">
                    View All Insights
                  </Link>
                </div>

              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
      {post.customFooterScript && (
        <div dangerouslySetInnerHTML={{ __html: post.customFooterScript }} />
      )}
    </>
  );
}
