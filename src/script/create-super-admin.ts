import { PrismaClient, UserRole } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await hash('admin123', 12); // Change this password!
  
  await prisma.user.create({
    data: {
      email: 'admin@bulkmobile.com',
      name: 'Platform Admin',
      password: hashedPassword,
      role: UserRole.SUPER_ADMIN,
      emailVerified: new Date(),
    },
  });
  
  console.log('✅ Super admin created!');
}

main();