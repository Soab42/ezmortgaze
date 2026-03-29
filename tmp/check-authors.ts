import prisma from '../lib/prisma'

async function main() {
  const authors = await prisma.author.findMany()
  console.log(JSON.stringify(authors, null, 2))
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
