import { prisma } from '../../src/config/db.server';
import { NewExercise, NewExerciseType } from '../../src/types/exercise';

export default async function seedExercises() {
  let bodyParts = await prisma.body_part.findMany();
  if (bodyParts.length === 0) {
    await Promise.all(
      getBodyParts().map(async (bodyPart) => {
        await prisma.body_part.create({
          data: {
            name: bodyPart,
          },
        });
      }),
    );
    console.log('Body parts seeded');
  }

  const exerciseTypes = await prisma.exercise_type.findMany();
  if (exerciseTypes.length === 0) {
    await Promise.all(
      getExerciseTypes().map(async (exerciseType) => {
        await prisma.exercise_type.create({
          data: {
            name: exerciseType.name,
            has_reps: exerciseType.has_reps,
            has_series: exerciseType.has_series,
            has_weights: exerciseType.has_weights,
            has_time: exerciseType.has_time,
            is_break: exerciseType.is_break,
          },
        });
      }),
    );
    console.log('Exercise types seeded');
  }

  const exercises = await prisma.exercise.findMany();
  if (exercises.length === 0) {
    bodyParts = await prisma.body_part.findMany({
      select: {
        body_part_id: true,
        name: true,
      },
    });
    await Promise.all(
      getExercises().map(async (exercise) => {
        await prisma.exercise.create({
          data: {
            exercise_type_id: exercise.exercise_type_id,
            name: exercise.name,
            description: exercise.description,
            exercises_body_parts: {
              create: exercise.body_parts.map((bodyPart) => {
                const dbBodyPart = bodyParts.find((bp) => bp.name === bodyPart);
                return {
                  body_part_id: dbBodyPart?.body_part_id || 1,
                };
              }),
            },
          },
        });
      }),
    );
    console.log('Exercises seeded');
  }
}

function getBodyParts(): string[] {
  return [
    'neck',
    'traps',
    'delts',
    'biceps',
    'triceps',
    'forearms',
    'pecs',
    'lats',
    'upper_abs',
    'lower_abs',
    'oblique',
    'quads',
    'back',
    'lower_back',
    'glutes',
    'hams',
    'calves',
  ];
}

function getExerciseTypes(): NewExerciseType[] {
  return [
    {
      name: 'reps',
      has_reps: true,
      has_series: true,
      has_weights: false,
      has_time: false,
      is_break: false,
    },
    {
      name: 'time',
      has_reps: false,
      has_series: true,
      has_weights: false,
      has_time: true,
      is_break: false,
    },
    {
      name: 'break',
      has_reps: false,
      has_series: false,
      has_weights: false,
      has_time: false,
      is_break: true,
    },
  ];
}

function getExercises(): NewExercise[] {
  return [
    {
      exercise_type_id: 1,
      name: 'Push ups',
      description:
        'Push-ups are exercises to strengthen your arms and chest muscles. They are done by lying with your face towards the floor and pushing with your hands to raise your body until your arms are straight.',
      body_parts: ['pecs', 'triceps'],
    },
    {
      exercise_type_id: 1,
      name: 'Pull ups',
      description:
        'A pull-up is an upper-body strength exercise. The pull-up is a closed-chain movement where the body is suspended by the hands, gripping a bar or other implement at a distance typically wider than shoulder-width, and pulled up. As this happens, the elbows flex and the shoulders adduct and extend to bring the elbows to the torso.',
      body_parts: ['lats', 'biceps'],
    },
    {
      exercise_type_id: 1,
      name: 'Squats',
      description:
        'A squat is a strength exercise in which the trainee lowers their hips from a standing position and then stands back up. During the descent, the hip and knee joints flex while the ankle joint dorsiflexes; conversely the hip and knee joints extend and the ankle joint plantarflexes when standing up.',
      body_parts: ['quads', 'glutes'],
    },
    {
      exercise_type_id: 1,
      name: 'Deadlifts',
      description:
        'The deadlift is a movement in which your hips hinge backward to lower down and pick up a weighted barbell or kettlebell from the floor. Your back is flat throughout the movement. Some benefits of performing deadlifts include strengthening and gaining more definition in your upper and lower back, glutes, and hamstrings.',
      body_parts: ['back', 'hams'],
    },
    {
      exercise_type_id: 2,
      name: 'Plank',
      description:
        'The plank is an isometric core strength exercise that involves maintaining a position similar to a push-up for the maximum possible time.',
      body_parts: ['upper_abs', 'lower_abs'],
    },
    {
      exercise_type_id: 2,
      name: 'Interval running',
      description:
        'Interval running is a type of training that involves a series of low- to high-intensity workouts interspersed with rest or relief periods. The high-intensity periods are typically at or close to anaerobic exercise, while the recovery periods involve activity of lower intensity. Varying the intensity of the exercise challenges the heart and lungs, which helps improve cardiovascular fitness.',
      body_parts: ['quads', 'glutes'],
    },
    {
      exercise_type_id: 3,
      name: 'Rest',
      description: 'Rest, because you and your muscles deserve it!',
      body_parts: [],
    },
  ];
}
