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

async function addUserHeight(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = Number((req.user as ReturnUser).userId) || 1;
    if (!userId) {
      throw new ApiError(400, 'Invalid user id');
    }

    const { height } = req.body;
    if (!height) {
      throw new ApiError(400, 'Invalid height');
    }

    const result = await UserService.addUserHeight(userId, height);

    if (!result) {
      throw new ApiError(500, 'Failed to add height');
    }

    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
}

async function getUserHeight(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = Number((req.user as ReturnUser).userId) || 1;
    if (!userId) {
      throw new ApiError(400, 'Invalid user id');
    }

    const height = await UserService.getUserHeight(userId);
    if (!height) {
      throw new ApiError(500, 'Failed to add height');
    }

    res.status(201).send(height);
  } catch (error) {
    next(error);
  }
}

async function getGender(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const userId = Number((req.user as ReturnUser).userId) || 1;

    const gender = await UserService.getGender(userId);

    if (!gender) {
      throw new ApiError(500, 'Failed to obtain gender');
    }

    res.status(200).send(gender);
  } catch (error) {
    next(error);
  }
}

async function getStreak(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const userId = Number((req.user as ReturnUser).userId) || 1;

    const streak = await UserService.getStreak(userId);

    if (!streak) {
      throw new ApiError(500, 'Failed to calculate streak');
    }

    res.status(200).send({ streak });
  } catch (error) {
    next(error);
  }
}

export {
  getAllUsers,
  getCurrentUser,
  addUserHeight,
  getUserHeight,
  getGender,
  getStreak,
};
export type { ReturnUser };
