import { Prisma } from '@prisma/client';
import { prisma } from '../../src/config/db.server';
import { NewWorkoutTemplate } from '../../src/types/workout';

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
        await prisma.exercise_template_item.create({
          data: {
            workout_template_id: exerciseTemplateItem.workout_template_id,
            exercise_id: exerciseTemplateItem.exercise_id,
            value: exerciseTemplateItem.value as Prisma.InputJsonValue,
            order_index: exerciseTemplateItem.order_index,
          },
        });
      }),
    );
    console.log('Exercise template items seeded');
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
    },
    {
      author_id: 1,
      name: '"the timetable is known" type of workout',
      description: 'Lets gooooo!',
      created_at: new Date(),
      private: false,
    },
  ];
}

type NewExerciseTemplateItem = {
  workout_template_id: number;
  exercise_id: number;
  value: Prisma.JsonValue;
  order_index: number;
};

function getExerciseTemplateItems(): NewExerciseTemplateItem[] {
  return [
    // workout 1
    {
      workout_template_id: 1,
      exercise_id: 1,
      value: JSON.stringify({
        series: 3,
        reps: 15,
        break: 60,
      }),
      order_index: 1,
    },
    {
      workout_template_id: 1,
      exercise_id: 6,
      value: JSON.stringify({
        break: 60,
      }),
      order_index: 2,
    },
    {
      workout_template_id: 1,
      exercise_id: 4,
      value: JSON.stringify({
        series: 3,
        time: 120,
        break: 60,
      }),
      order_index: 2,
    },
    // workout 2
    {
      workout_template_id: 2,
      exercise_id: 1,
      value: JSON.stringify({
        series: 2,
        reps: 15,
        break: 30,
      }),
      order_index: 1,
    },
    {
      workout_template_id: 2,
      exercise_id: 2,
      value: JSON.stringify({
        series: 2,
        reps: 15,
        break: 30,
      }),
      order_index: 2,
    },
    {
      workout_template_id: 2,
      exercise_id: 3,
      value: JSON.stringify({
        series: 2,
        reps: 15,
        break: 30,
      }),
      order_index: 3,
    },
  ];
}
