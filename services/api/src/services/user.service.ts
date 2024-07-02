import { prisma } from '../config/db.server';
import { getUserByEmail } from '../persistance/user.db';
import { ReturnUser } from '../types/user';

async function checkEmailUniqueness(email: string) {
  try {
    const user = await getUserByEmail(email);
    return user === null;
  } catch (error) {
    return false;
  }
}

async function getAllUsers() {
  const users: ReturnUser[] = (await prisma.app_user.findMany()).map(
    (user) => ({
      user_id: user.user_id,
      email: user.email,
      username: user.username,
    }),
  );

  return users;
}

export { checkEmailUniqueness, getAllUsers };
