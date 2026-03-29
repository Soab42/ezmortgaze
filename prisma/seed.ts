import 'dotenv/config'
import bcrypt from 'bcryptjs'
import prisma from '../lib/prisma'

async function main() {
  console.log('Starting seed...')
  
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@ezmortgaze.com' }
  })

  if (existingAdmin) {
    console.log('Admin already exists. Skipping Admin seed.')
  } else {
    const adminPassword = await bcrypt.hash('password123', 10)
    await prisma.user.create({
      data: {
        email: 'admin@ezmortgaze.com',
        name: 'Primary Admin',
        password: adminPassword,
        role: 'ADMIN',
      },
    })
    console.log('✅ Admin user created.')
    console.log('   Email: admin@ezmortgaze.com | Pass: password123')
  }

  const existingEditor = await prisma.user.findUnique({
    where: { email: 'editor@ezmortgaze.com' }
  })

  if (existingEditor) {
    console.log('Editor already exists. Skipping Editor seed.')
  } else {
    const editorPassword = await bcrypt.hash('password123', 10)
    await prisma.user.create({
      data: {
        email: 'editor@ezmortgaze.com',
        name: 'Content Editor',
        password: editorPassword,
        role: 'EDITOR',
      },
    })
    console.log('✅ Editor user created.')
    console.log('   Email: editor@ezmortgaze.com | Pass: password123')
  }
  
  console.log('✨ Seed process completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
