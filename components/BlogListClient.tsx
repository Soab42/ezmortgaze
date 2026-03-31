"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const PAGE_SIZE = 6;

export default function BlogListClient({ initialPosts }: { initialPosts: any[] }) {
  const [posts, setPosts] = useState(initialPosts.slice(1));
  const [page, setPage] = useState(2);
  // If we received exactly 7 posts initially (1 featured + 6 grid), there might be more
  const [hasMore, setHasMore] = useState(initialPosts.length === 7);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const featuredPost = initialPosts[0];

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const res = await fetch(`/api/blog?page=${page}&limit=${PAGE_SIZE}`);
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();

      setPosts((prev) => [...prev, ...data.posts]);
      setHasMore(data.hasMore);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, page]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  if (!featuredPost) {
    return <div className="text-center text-zinc-500 py-20">No articles available.</div>;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <Link href={`/blog/${featuredPost.slug}`} className="group block mb-20">
          <div className="relative aspect-21/9 rounded-[3rem] overflow-hidden border border-white/10">
            <Image
              src={featuredPost.coverImage || "/placeholder.jpg"}
              alt={featuredPost.title}
              fill
              sizes="(max-width: 768px) 100vw, 90vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#020610] via-[#020610]/40 to-transparent" />

            <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full md:w-2/3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-zinc-950 text-xs font-bold uppercase tracking-wider mb-6">
                Featured Article
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6 group-hover:text-amber-400 transition-colors text-shadow-md">
                {featuredPost.title}
              </h2>
              <div className="flex items-center gap-6 text-zinc-300 text-sm font-medium text-shadow-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(featuredPost.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {featuredPost.readTime || "5 min read"}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (index % PAGE_SIZE) * 0.08 }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col h-full glass-panel rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-amber-500/30 transition-all duration-500"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.coverImage || "/placeholder.jpg"}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#020610]/80 backdrop-blur-md border border-white/10 text-xs font-bold text-amber-500">
                  {post.category?.name || "Uncategorized"}
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-amber-500 font-black text-[8px] overflow-hidden relative shrink-0">
                      {post.author?.avatar ? (
                        <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                      ) : (
                        post.author?.name?.split(" ").map((n: string) => n[0]).join("") || "A"
                      )}
                    </div>
                    <span>{post.author?.name || "EZ Author"}</span>
                  </div>
                  <span>•</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{post.readTime || "5 min read"}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-zinc-400 text-sm line-clamp-2 mb-8 leading-relaxed">
                  {post.excerpt?.replace(/<[^>]+>/g, '')}
                </p>

                <div className="mt-auto flex items-center gap-2 text-amber-500 text-sm font-bold group-hover:gap-4 transition-all">
                  Read Story
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div ref={sentinelRef} className="flex items-center justify-center py-16 mt-4">
        {isLoading && (
          <div className="flex items-center gap-3 text-zinc-500 text-sm font-medium">
            <Loader2 className="w-5 h-5 animate-spin text-amber-500" />
            Loading more insights…
          </div>
        )}
        {!hasMore && posts.length > 0 && (
          <p className="text-zinc-600 text-sm font-medium tracking-widest uppercase">
            — You&apos;ve reached the end —
          </p>
        )}
      </div>
    </>
  );
}
