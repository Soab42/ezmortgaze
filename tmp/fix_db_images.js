const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Fixing invalid image URLs...');
  
  const result1 = await prisma.post.updateMany({
    where: {
      OR: [
        { coverImage: { contains: 'kuro.info' } },
        { coverImage: { contains: 'pala.com.au' } }
      ]
    },
    data: {
      coverImage: ''
    }
  });
  console.log(`Updated ${result1.count} posts with invalid cover images.`);

  const result2 = await prisma.author.updateMany({
    where: {
      OR: [
        { avatar: { contains: 'kuro.info' } },
        { avatar: { contains: 'pala.com.au' } }
      ]
    },
    data: {
      avatar: ''
    }
  });
  console.log(`Updated ${result2.count} authors with invalid avatars.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
