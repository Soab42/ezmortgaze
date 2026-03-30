import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Calendar, Clock, Twitter, Linkedin, ArrowRight } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = await prisma.author.findUnique({
    where: { slug }
  });
  
  if (!author) return { title: "Author Not Found" };

  return {
    title: `${author.name} | EZMortgageLender.com®`,
    description: author.bio,
    alternates: { canonical: `https://ezmortgagelender.com/author/${author.slug}` },
    openGraph: {
      title: `${author.name} — ${author.role}`,
      description: author.bio,
      url: `https://ezmortgagelender.com/author/${author.slug}`,
    },
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  
  const author = await prisma.author.findUnique({
    where: { slug },
    include: {
      posts: {
        where: { isPublished: true },
        include: { category: true },
        orderBy: { publishDate: 'desc' }
      }
    }
  });

  if (!author) notFound();

  const authorSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    url: `https://ezmortgagelender.com/author/${author.slug}`,
    sameAs: [author.twitter, author.linkedin].filter(Boolean),
  };

  return (
    <main className="relative min-h-screen bg-[#020610]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }} />
      <Navbar />

      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Breadcrumbs */}
          <div className="mb-10">
            <Breadcrumbs items={[
              { label: "Blog", href: "/blog" },
              { label: author.name },
            ]} />
          </div>

          {/* Author Card */}
          <div className="glass-panel p-8 md:p-12 rounded-4xl border border-white/10 bg-white/3 backdrop-blur-xl flex flex-col md:flex-row items-center md:items-start gap-8 mb-16">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-3xl overflow-hidden bg-white/10 border border-white/10 shrink-0 flex items-center justify-center text-zinc-500 font-black text-4xl">
              {author.avatar ? (
                <Image 
                  src={author.avatar} 
                  alt={author.name} 
                  fill 
                  className="object-cover" 
                />
              ) : (
                author.name.split(" ").map((n: string) => n[0]).join("")
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <p className="text-amber-400 text-xs font-black uppercase tracking-[0.25em] mb-2">{author.role}</p>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">{author.name}</h1>
              <p className="text-zinc-400 leading-relaxed text-base md:text-lg mb-6 max-w-2xl">{author.bio}</p>

              <div className="flex items-center gap-3 justify-center md:justify-start">
                {author.twitter && (
                  <a href={author.twitter} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {author.linkedin && (
                  <a href={author.linkedin} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Author Posts */}
          <h2 className="text-2xl font-black text-white tracking-tight mb-8">
            Articles by <span className="gradient-text-gold">{author.name.split(" ")[0]}</span>
          </h2>

          {author.posts.length === 0 ? (
            <p className="text-zinc-500">No articles yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {author.posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group glass-panel rounded-3xl border border-white/5 overflow-hidden hover:border-amber-500/30 transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.coverImage || "/placeholder.jpg"}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#020610]/80 backdrop-blur-md border border-white/10 text-xs font-bold text-amber-500">
                      {post.category?.name || "Uncategorized"}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-zinc-600 text-[10px] font-bold uppercase tracking-widest mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.publishDate || post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                      <span>·</span>
                      <Clock className="w-3.5 h-3.5" />{post.readTime || "5 min read"}
                    </div>
                    <h3 className="text-lg font-bold text-white leading-snug mb-3 group-hover:text-amber-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-zinc-500 text-sm line-clamp-2 mb-4 leading-relaxed">{post.excerpt}</p>
                    <div className="mt-auto flex items-center gap-2 text-amber-500 text-sm font-bold group-hover:gap-4 transition-all">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
