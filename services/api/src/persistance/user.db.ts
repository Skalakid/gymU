import { prisma } from '../config/db.server';

async function getUserByEmail(email: string) {
  return await prisma.appUser.findUnique({
    where: {
      email: email,
    },
  });
}

async function getUserById(userId: number) {
  return await prisma.appUser.findUnique({
    where: {
      userId: userId,
    },
    select: {
      userId: true,
      username: true,
    },
  });
}

async function addUserHeight(userId: number, height: number) {
  return await prisma.appUser.update({
    where: {
      userId,
    },
    data: {
      height,
    },
  });
}

async function getUserHeight(userId: number) {
  return await prisma.appUser.findUnique({
    select: {
      height: true,
    },
    where: {
      userId,
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

export { getUserByEmail, getUserById, addUserHeight, getUserHeight, getGender };
