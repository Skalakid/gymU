import { Prisma } from '@prisma/client';
import { prisma } from '../../src/config/db.server';
import { NewWorkoutTemplate } from '../../src/types/workout';
import { WorkoutTag } from '../../src/types/workout';

export default async function seedWorkouts() {
  const workoutTemplates = await prisma.workout_template.findMany();
  if (workoutTemplates.length === 0) {
    await Promise.all(
      getWorkoutTemplates().map(async (workoutTemplate) => {
        await prisma.workout_template.create({
          data: {
            author_id: workoutTemplate.author_id,
            name: workoutTemplate.name,
            description: workoutTemplate.description,
            created_at: workoutTemplate.created_at,
            private: workoutTemplate.private,
            workout_level_id: workoutTemplate.workout_level_id,
          },
        });
      }),
    );
    console.log('Workout templates seeded');
  }

  const exerciseTemplateItems = await prisma.exercise_template_item.findMany();
  if (exerciseTemplateItems.length === 0) {
    await Promise.all(
      getExerciseTemplateItems().map(async (exerciseTemplateItem) => {
        const exercise = await prisma.exercise.findFirst({
          where: {
            name: exerciseTemplateItem.exercise_name,
          },
          select: {
            exercise_id: true,
          },
        });
        if (exercise) {
          await prisma.exercise_template_item.create({
            data: {
              workout_template_id: exerciseTemplateItem.workout_template_id,
              exercise_id: exercise.exercise_id,
              value: exerciseTemplateItem.value as Prisma.InputJsonValue,
              order_index: exerciseTemplateItem.order_index,
            },
          });
        }
      }),
    );
    console.log('Exercise template items seeded');
  }

  const workoutTags = await prisma.workout_tags.findMany();
  if (workoutTags.length === 0) {
    await Promise.all(
      getWorkoutTags().map(async (workoutTag) => {
        await prisma.workout_tags.create({
          data: {
            tag_id: workoutTag.tag_id,
            workout_template_id: workoutTag.workout_template_id,
          },
        });
      }),
    );
    console.log('Workout tags seeded');
  }
}

function getWorkoutTemplates(): NewWorkoutTemplate[] {
  return [
    {
      author_id: 1,
      name: 'Giga workout',
      description:
        'Professional workout dedicated for gym lovers that focuses on all muscle groups',
      created_at: new Date(),
      private: false,
      workout_level_id: 1,
    },
    {
      author_id: 1,
      name: '"the timetable is known" type of workout',
      description: 'Lets gooooo!',
      created_at: new Date(),
      private: false,
      workout_level_id: 4,
    },
  ];
}

type NewExerciseTemplateItemSeed = {
  workout_template_id: number;
  exercise_name: string;
  value: Prisma.JsonValue;
  order_index: number;
};

function getExerciseTemplateItems(): NewExerciseTemplateItemSeed[] {
  return [
    // workout 1
    {
      workout_template_id: 1,
      exercise_name: 'Push ups',
      value: JSON.stringify({
        sets: 3,
        reps: 15,
        breakTime: 60,
      }),
      order_index: 1,
    },
    {
      workout_template_id: 1,
      exercise_name: 'Interval running',
      value: JSON.stringify({
        time: 1000,
        breakTime: 120,
      }),
      order_index: 2,
    },
    {
      workout_template_id: 1,
      exercise_name: 'Deadlifts',
      value: JSON.stringify({
        sets: 3,
        reps: 10,
        weight: 80,
        breakTime: 60,
      }),
      order_index: 3,
    },
    // workout 2
    {
      workout_template_id: 2,
      exercise_name: 'Pull ups',
      value: JSON.stringify({
        sets: 4,
        reps: 5,
        breakTime: 60,
      }),
      order_index: 1,
    },
    {
      workout_template_id: 2,
      exercise_name: 'Squats',
      value: JSON.stringify({
        sets: 3,
        reps: 10,
        breakTime: 60,
      }),
      order_index: 2,
    },
    {
      workout_template_id: 2,
      exercise_name: 'Rest',
      value: JSON.stringify({
        breakTime: 240,
      }),
      order_index: 3,
    },
  ];
}

function getWorkoutTags(): WorkoutTag[] {
  return [
    {
      tag_id: 1,
      workout_template_id: 1,
    },
    {
      tag_id: 2,
      workout_template_id: 1,
    },
    {
      tag_id: 3,
      workout_template_id: 2,
    },
    {
      tag_id: 4,
      workout_template_id: 2,
    },
    {
      tag_id: 5,
      workout_template_id: 2,
    },
  ];
}
