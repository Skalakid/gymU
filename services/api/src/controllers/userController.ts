import { prisma } from '../config/db.server';

async function checkEmailUniqueness(email: string) {
  try {
    const user = await prisma.app_user.findUnique({
      where: {
        email: email,
      },
    });
    return user === null;
  } catch (error) {
    return false;
  }
}

export { checkEmailUniqueness };
