import { Request, Response } from 'express';
import { prisma } from '../config/db.server';

type ReturnUser = {
  user_id: number;
  email: string;
  username: string;
};

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

async function getAllUsers(req: Request, res: Response) {
  console.log('getAllUsers');
  try {
    const users: ReturnUser[] = (await prisma.app_user.findMany()).map(
      (user) => ({
        user_id: user.user_id,
        email: user.email,
        username: user.username,
      }),
    );

    res.status(201).send(users);
  } catch (error) {
    return [];
  }
}

export { checkEmailUniqueness, getAllUsers };
export type { ReturnUser };
