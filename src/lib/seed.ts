import bcrypt from 'bcrypt';
import { prisma } from './prisma';

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@rentnest.com' },
    update: {},
    create: {
      name: 'System Admin',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });
}
main()