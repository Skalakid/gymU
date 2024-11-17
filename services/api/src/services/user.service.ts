import { prisma } from '../config/db.server';
import * as UserDB from '../persistance/user.db';
import { ReturnUser } from '../types/user';

async function checkEmailUniqueness(email: string) {
  try {
    const user = await UserDB.getUserByEmail(email);
    return user === null;
  } catch (error) {
    return false;
  }
}

async function getAllUsers() {
  const users: ReturnUser[] = (await prisma.appUser.findMany()).map((user) => ({
    userId: user.userId,
    email: user.email,
    username: user.username,
  }));

  return users;
}

async function getGender(userId: number) {
  return await UserDB.getGender(userId);
}

export { checkEmailUniqueness, getAllUsers, getGender };
