import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "6", 10);

    // Initial page load takes 7 posts (1 featured + 6 normal)
    // For subsequent pages, skip the initial 7 and then use standard pagination
    const baseSkip = 7;
    
    let skip = 0;
    if (page > 1) {
      skip = baseSkip + (page - 2) * limit;
    }

    // Only allow querying posts after page 1, as page 1 is loaded SSR
    if (page === 1) {
       return NextResponse.json({ posts: [], hasMore: false }, { status: 400 });
    }

    const posts = await prisma.post.findMany({
      where: { isPublished: true },
      include: {
        category: true,
        author: true,
      },
      orderBy: {
        publishDate: 'desc',
      },
      skip,
      take: limit,
    });

    const totalPosts = await prisma.post.count({
      where: { isPublished: true },
    });

    const hasMore = skip + posts.length < totalPosts;

    return NextResponse.json({ posts, hasMore });
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
