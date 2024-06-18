import { prisma } from '../../src/config/db.server';
import { NewUser } from '../../src/types/user';
import bcrypt from 'bcrypt';

export default async function seedUsers() {
  const currentUsers = await prisma.app_user.findMany();
  if (currentUsers.length === 0) {
    await Promise.all(
      getExampleUsers().map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await prisma.app_user.create({
          data: {
            username: user.username,
            email: user.email,
            password_hash: hashedPassword,
          },
        });
      }),
    );
    console.log('Users seeded');
  }
}

function getExampleUsers(): Array<NewUser> {
  return [
    {
      username: 'devUser',
      email: 'test@test.pl',
      password: 'test',
    },
    {
      username: 'pigeon64',
      email: 'test2@test.pl',
      password: 'test',
    },
    {
      username: 'pepe',
      email: 'test3@test.pl',
      password: 'test',
    },
  ];
}
