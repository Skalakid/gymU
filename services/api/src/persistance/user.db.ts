import { prisma } from '../config/db.server';

async function getUserByEmail(email: string) {
  return await prisma.appUser.findUnique({
    where: {
      email: email,
    },
  });
}

async function getGender(userId: number) {
  return await prisma.appUser.findUnique({
    select: {
      gender: true,
    },
    where: {
      userId,
    },
  });
}

export { getUserByEmail, getGender };
