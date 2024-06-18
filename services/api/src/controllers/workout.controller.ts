import { Response } from 'express';
import { prisma } from '../config/db.server';
import { AuthRequest } from '../middlewares/auth.middleware';

async function getAllWorkouts(req: AuthRequest, res: Response) {
  try {
    let  workouts = await prisma.workout_template.findMany({
      include: {
        app_user: {
          select: {
            username: true,
          },
        },
        workout_tags: {
          select: {
            tag: true
          },
        },
      },
    });

    const workoutsWithTagName = workouts.map(({app_user, author_id, ...workout}) => {
      return {
        ...workout,
        author: {
          user_id: author_id,
          username: app_user.username
        },
        workout_tags: workout.workout_tags.map(workout_tag => workout_tag.tag),
      };
    });

    res.status(201).send(workoutsWithTagName);
  } catch (error) {
    return res.send(500).send('Internal server error');
  }
}

export { getAllWorkouts };
