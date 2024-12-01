import { prisma } from '../config/db.server';

async function getUserByEmail(email: string) {
  return await prisma.appUser.findUnique({
    where: {
      email: email,
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

async function getCreationDate(userId: number) {
  return await prisma.appUser.findUnique({
    select: {
      createdAt: true,
    },
    where: {
      userId,
    },
  });
}

export {
  getUserByEmail,
  addUserHeight,
  getUserHeight,
  getGender,
  getCreationDate,
};
