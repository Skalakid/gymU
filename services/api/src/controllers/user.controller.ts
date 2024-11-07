import { NextFunction, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import * as UserService from '../services/user.service';
import { ReturnUser } from '../types/user';
import ApiError from '../error/ApiError';

async function getAllUsers(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const users = await UserService.getAllUsers();
    res.status(201).send(users);
  } catch (error) {
    next(error);
  }
}

async function getCurrentUser(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = req.user as ReturnUser;
    if (!user) {
      throw new ApiError(401, 'User not authenticated'); // 401 because the user is not authenticated and user parameter is not set
    }
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
}

export { getAllUsers, getCurrentUser };
export type { ReturnUser };
