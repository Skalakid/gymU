import { prisma } from '../config/db.server';

async function getUserByEmail(email: string) {
  return await prisma.app_user.findUnique({
    where: {
      email: email,
    },
  });
}

export { getUserByEmail };
