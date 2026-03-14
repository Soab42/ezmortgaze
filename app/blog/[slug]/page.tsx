"use client";

import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blogs";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";

export default function BlogDetails() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-[#020610] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl text-white font-bold mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-amber-500 font-bold hover:underline">Return to Blog</Link>
        </div>
      </main>
    );
  }

  const relatedPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 2);

  return (
    <main className="relative min-h-screen bg-[#020610]">
      <Navbar />

      {/* Article Hero */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#020610]/60 to-[#020610]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 px-6 w-full">
          <div className="flex flex-col items-start gap-12 mb-8">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-amber-500 text-sm font-bold hover:gap-4 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Insights
            </Link>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500 text-zinc-950 text-[11px] font-black uppercase tracking-[0.2em] shadow-lg">
              {post.category}
            </div>
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter mb-8">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-8 text-zinc-400 text-sm border-t border-white/10 pt-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-amber-500">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Written By</p>
                <p className="text-white font-bold">{post.author}</p>
              </div>
            </div>
            <div className="h-10 w-px bg-white/10 block" />
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-500" />
                <span className="font-medium">{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                <span className="font-medium">{post.readTime}</span>
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
            <div className="flex-1">
              <div
                className="prose prose-invert prose-amber max-w-none prose-p:text-zinc-400 prose-p:leading-[1.8] prose-p:text-lg prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight prose-blockquote:border-amber-500 prose-blockquote:bg-white/5 prose-blockquote:p-6 prose-blockquote:rounded-2xl"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500 text-sm font-bold">Share this insight</span>
                  <div className="flex gap-2">
                    {[1, 2, 3].map(i => (
                      <button key={i} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-zinc-950 transition-all">
                        <Share2 className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  {["#CommercialRE", "#FinTech", "#AI"].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-lg bg-zinc-950 border border-white/5 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Sidebar */}
            <aside className="w-full lg:w-80 space-y-8">
              <div className="sticky top-32">
                <div className="glass-panel p-8 rounded-3xl border border-white/5 bg-linear-to-b from-white/5 to-transparent">
                  <h3 className="text-xl font-bold text-white mb-6">Related Insights</h3>
                  <div className="space-y-6">
                    {relatedPosts.map(rp => (
                      <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block">
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2">{rp.category}</p>
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
  );
}
