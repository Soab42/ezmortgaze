import prisma from "@/lib/prisma"

async function main() {
  const posts = await prisma.post.findMany({
    select: { coverImage: true, id: true, title: true },
    take: 10
  });
  console.log(JSON.stringify(posts, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
