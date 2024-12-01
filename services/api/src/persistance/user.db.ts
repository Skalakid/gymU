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

async function getAllUsers(
  skip: number,
  pageSize: number,
  userIdsToSkip: number[] = [],
) {
  return await prisma.appUser.findMany({
    skip: skip,
    take: pageSize,
    where: {
      userId: {
        notIn: userIdsToSkip,
      },
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

export {
  getUserByEmail,
  getUserById,
  getAllUsers,
  addUserHeight,
  getUserHeight,
  getGender,
};
