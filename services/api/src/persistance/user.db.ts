import { prisma } from '../config/db.server';

async function getUserByEmail(email: string) {
  return await prisma.appUser.findUnique({
    where: {
      email: email,
    },
  });
}

export { getUserByEmail };
