"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blogs";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export default function BlogListing() {
  const featuredPost = blogPosts[0];
  const remainingPosts = blogPosts.slice(1);

  return (
    <main className="relative min-h-screen bg-[#020610]">
      <Navbar />

      {/* Blog Hero section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-amber-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <h1 className="text-5xl font-black text-white tracking-tighter mb-6">
              The <span className="gradient-text-gold">Lending</span> Insights
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed">
              Expert analysis, market trends, and AI-driven strategies for the modern real estate investor.
            </p>
          </div>

          {/* Featured Post */}
          <Link href={`/blog/${featuredPost.slug}`} className="group block mb-20">
            <div className="relative aspect-21/9 rounded-[3rem] overflow-hidden border border-white/10">
              <Image
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#020610] via-[#020610]/40 to-transparent" />

              <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full md:w-2/3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-zinc-950 text-xs font-bold uppercase tracking-wider mb-6">
                  Featured Article
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6 group-hover:text-amber-400 transition-colors">
                  {featuredPost.title}
                </h2>
                <div className="flex items-center gap-6 text-zinc-400 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {featuredPost.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col h-full glass-panel rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-amber-500/30 transition-all duration-500"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#020610]/80 backdrop-blur-md border border-white/10 text-xs font-bold text-amber-500">
                    {post.category}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-4">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-zinc-400 text-sm line-clamp-3 mb-8 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto flex items-center gap-2 text-amber-500 text-sm font-bold group-hover:gap-4 transition-all">
                    Read Story
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
