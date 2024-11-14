import { prisma } from '../config/db.server';
import { ExerciseWorkoutItem } from '../types/workout';

async function getAllWorkoutsPaginated(
  skip: number,
  pageSize: number,
  tagIds: number[] | null,
) {
  return await prisma.workoutTemplate.findMany({
    skip: skip,
    take: pageSize,
    where: tagIds
      ? {
          workoutTags: {
            some: {
              tag: {
                tagId: {
                  in: tagIds,
                },
              },
            },
          },
        }
      : undefined,
    include: {
      appUser: {
        select: {
          username: true,
        },
      },
      workoutTags: {
        select: {
          tag: true,
        },
      },
      workoutLevel: {
        select: {
          name: true,
        },
      },
    },
  });
}

async function countAllFilteredWorkouts(tagIds: number[] | null) {
  return await prisma.workoutTemplate.count({
    where: tagIds
      ? {
          workoutTags: {
            some: {
              tag: {
                tagId: {
                  in: tagIds,
                },
              },
            },
          },
        }
      : undefined,
  });
}

async function getWorkoutDetails(workoutId: number) {
  return await prisma.workoutTemplate.findUnique({
    where: {
      workoutId: Number(workoutId),
    },
    include: {
      appUser: {
        select: {
          username: true,
        },
      },
      workoutTags: {
        select: {
          tag: true,
        },
      },
      workoutLevel: {
        select: {
          name: true,
        },
      },
      exerciseTemplateItems: {
        select: {
          exercise: {
            select: {
              name: true,
              exerciseType: {
                select: {
                  name: true,
                },
              },
              exercisesBodyParts: {
                select: {
                  bodyPart: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
          value: true,
          orderIndex: true,
          exerciseId: true,
        },
      },
    },
  });
}

async function createWorkout(
  authorId: number,
  name: string,
  description: string,
  isPrivate: boolean,
  workoutLevelId: number,
  tagIds: number[],
  exercises: ExerciseWorkoutItem[],
) {
  const newWorkout = await prisma.workoutTemplate.create({
    data: {
      authorId: authorId || 1,
      name,
      description,
      createdAt: new Date(),
      private: isPrivate,
      workoutLevelId,
    },
  });
  if (!newWorkout) {
    return null;
  }

  const workoutTags = tagIds.map((tagId: number) => {
    return prisma.workoutTags.create({
      data: {
        tagId,
        workoutTemplateId: newWorkout.workoutId,
      },
    });
  });
  const exerciseItems = exercises.map((item: ExerciseWorkoutItem) => {
    return prisma.exerciseTemplateItem.create({
      data: {
        workoutTemplateId: newWorkout.workoutId,
        exerciseId: item.exerciseId,
        value: item.value,
        orderIndex: item.orderIndex,
      },
    });
  });
  await prisma.$transaction([...workoutTags, ...exerciseItems]);

  return newWorkout;
}

async function getAllWorkoutTags() {
  return await prisma.workoutTemplate.findMany({
    select: {
      workoutTags: {
        select: {
          tag: true,
        },
      },
    },
  });
}

async function getWorkoutDifficulties() {
  return await prisma.workoutLevel.findMany();
}

export {
  getAllWorkoutsPaginated,
  countAllFilteredWorkouts,
  getWorkoutDetails,
  createWorkout,
  getAllWorkoutTags,
  getWorkoutDifficulties,
};
