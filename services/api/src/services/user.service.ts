import { prisma } from '../config/db.server';
import * as UserDB from '../persistance/user.db';
import * as CalendarDB from '../persistance/calendar.db';
import * as UserWorkoutLogDB from '../persistance/userWorkoutLog.db';
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

async function addUserHeight(userId: number, height: number) {
  return await UserDB.addUserHeight(userId, height);
}

async function getUserHeight(userId: number) {
  return await UserDB.getUserHeight(userId);
}

async function getGender(userId: number) {
  return await UserDB.getGender(userId);
}

async function getStreak(userId: number) {
  const userCreationDate = await UserDB.getCreationDate(userId);

  if (!userCreationDate) {
    return -1;
  }

  const userAddedWorkouts = await CalendarDB.getAllEventsInRange(
    userId,
    userCreationDate.createdAt!,
    new Date(),
  );

  const userCompletedWorkouts =
    await UserWorkoutLogDB.getUserWorkoutLogs(userId);

  const makeUnique = (value: string, index: number, array: string[]) =>
    array.indexOf(value) === index;

  const addedWorkoutsDates = userAddedWorkouts
    .map((workout) => workout.datetime.toLocaleDateString())
    .filter(makeUnique);

  const completedWorkoutDates = userCompletedWorkouts
    .map((workout) => workout.logDate!.toLocaleDateString())
    .filter(makeUnique);

  let streak = 0;

  for (const date of addedWorkoutsDates) {
    if (completedWorkoutDates.includes(date)) {
      ++streak;
    } else {
      break;
    }
  }

  return streak;
}

export {
  checkEmailUniqueness,
  getAllUsers,
  addUserHeight,
  getUserHeight,
  getGender,
  getStreak,
};
