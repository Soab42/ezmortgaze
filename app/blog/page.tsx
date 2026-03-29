import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import prisma from "@/lib/prisma";
import BlogListClient from "@/components/BlogListClient";

// Opt into ISR caching. Revalidate every hour if not triggered via webhook
export const revalidate = 3600;

export default async function BlogListing() {
  const posts = await prisma.post.findMany({
    where: { isPublished: true },
    include: {
      category: true,
      author: true,
    },
    orderBy: {
      publishDate: 'desc',
    },
  });

  return (
    <main className="relative min-h-screen bg-[#020610]">
      <Navbar />

      {/* Blog Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-amber-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-16 animate-fade-in-up">
            <h1 className="text-5xl font-black text-white tracking-tighter mb-6">
              The <span className="text-amber-500">Lending</span> Insights
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed">
              Expert analysis, market trends, and AI-driven strategies for the modern real estate investor.
            </p>
          </div>

          <BlogListClient initialPosts={posts} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
