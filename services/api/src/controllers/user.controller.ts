import { Response } from 'express';
import { prisma } from '../config/db.server';
import { AuthRequest } from '../middlewares/auth.middleware';

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

async function getAllUsers(req: AuthRequest, res: Response) {
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

async function getCurrentUser(req: AuthRequest, res: Response) {
  try {
    const user = req.user as ReturnUser;
    if (!user) {
      throw new Error('User not found');
    }
    res.status(200).send(user);
  } catch (error) {
    return res.send(500).send('Internal server error');
  }
}

export { checkEmailUniqueness, getAllUsers, getCurrentUser };
export type { ReturnUser };
