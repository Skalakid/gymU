import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as UserService from '../services/user.service';
import { ReturnUser } from '../types/user';

async function getAllUsers(req: AuthRequest, res: Response) {
  try {
    const users = await UserService.getAllUsers();
    res.status(201).send(users);
  } catch (error) {
    return [];
  }
}

async function getCurrentUser(req: AuthRequest, res: Response) {
  try {
    const user = req.user as ReturnUser;
    if (!user) {
      return res.sendStatus(401); // 401 because the user is not authenticated and user parameter is not set
    }
    res.status(200).send(user);
  } catch (error) {
    return res.send(500).send('Internal server error');
  }
}

export { getAllUsers, getCurrentUser };
export type { ReturnUser };
