import * as UserDB from '../persistance/user.db';
import { PaginatedResponse } from '../types/api';
import { BaseUser, UserDetails } from '../types/user';

async function checkEmailUniqueness(email: string) {
  try {
    const user = await UserDB.getUserByEmail(email);
    return user === null;
  } catch (error) {
    return false;
  }
}

async function getAllUsers(
  page: number,
  skip: number,
  pageSize: number,
  userIdsToSkip: number[] = [],
): Promise<PaginatedResponse<BaseUser[]>> {
  const users: BaseUser[] = await UserDB.getAllUsers(
    pageSize,
    skip,
    userIdsToSkip,
  );

  const allWorkoutsCount = await UserDB.countAllUsers(userIdsToSkip);

  const paginatedResponse: PaginatedResponse<BaseUser[]> = {
    currentPage: page,
    pages: Math.ceil(allWorkoutsCount / pageSize),
    totalItems: allWorkoutsCount,
    pageSize,
    currentPageSize: users.length,
    data: users,
  };
  return paginatedResponse;
}

async function getUserDetails(userId: number): Promise<UserDetails | null> {
  return await UserDB.getUserById(userId);
}

async function addUserHeight(userId: number, height: number) {
  return await UserDB.addUserHeight(userId, height);
}

async function getUserHeight(userId: number) {
  return await UserDB.getUserHeight(userId);
}

async function getGender(userId: number) {
  return await UserDB.getGender(userId);
}

export {
  checkEmailUniqueness,
  getAllUsers,
  getUserDetails,
  addUserHeight,
  getUserHeight,
  getGender,
};
