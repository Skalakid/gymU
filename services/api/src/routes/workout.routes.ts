import express from 'express';
import * as workoutController from '../controllers/workout.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/all', workoutController.getAllWorkouts);
router.get('/:id', workoutController.getWorkoutDetails);

export = router;
