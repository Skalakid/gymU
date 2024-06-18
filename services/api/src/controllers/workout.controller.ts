import { Response } from 'express';
import { prisma } from '../config/db.server';
import { AuthRequest } from '../middlewares/auth.middleware';
import {PaginatedResponse} from '../types/api.d'

async function getAllWorkouts(req: AuthRequest, res: Response) {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.size) || 10;
    const skip = (page - 1) * pageSize;

    const allWorkouts = await prisma.workout_template.count();

    const workouts = await prisma.workout_template.findMany({
      skip: skip,
      take: pageSize, 
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

    const paginatedResponse: PaginatedResponse = {
      currentPage: page,
      pages: Math.ceil(allWorkouts / pageSize),
      totalItems: allWorkouts,
      pageSize,
      currentPageSize: workoutsWithTagName.length,
      data: workoutsWithTagName,
    };
    res.status(201).send(paginatedResponse);
  } catch (error) {
    return res.send(500).send('Internal server error');
  }
}

export { getAllWorkouts };
