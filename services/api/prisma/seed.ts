import { prisma } from '../src/config/db.server';
import bcrypt from 'bcrypt';

type NewUser = {
  username: string;
  email: string;
  password: string;
};

async function seed() {
  const currentUsers = await prisma.app_user.findMany();
  if (currentUsers.length === 0) {
    await Promise.all(
      getUsers().map(async (user) => {
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
  }
}
seed();

function getUsers(): Array<NewUser> {
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
