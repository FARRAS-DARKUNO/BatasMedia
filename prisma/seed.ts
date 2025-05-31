import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    
  const hashed = (await bcrypt.hash('superuser', 10)).toString(); 

  await prisma.user.upsert({
    where: { username: 'Sysadmin' },
    update: {},
    create: {
      username: 'Sysadmin',
      fullName: 'Sysadmin',
      noWA: '0888888888888',
      password: hashed,
      role: 'SUPERADMIN',
      startDate: new Date(),
    },
  });

  console.log('Seed completed');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
