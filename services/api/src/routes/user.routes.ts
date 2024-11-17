import express from 'express';
import * as userController from '../controllers/user.controller';
import * as userWorkoutController from '../controllers/userWorkout.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/current', authenticateToken, userController.getCurrentUser);
router.get('/all', authenticateToken, userController.getAllUsers);
router.get('/height', authenticateToken, userController.getUserHeight);
router.post('/height', authenticateToken, userController.addUserHeight);
router.get('/gender', authenticateToken, userController.getGender);

router.post(
  '/workout/save',
  authenticateToken,
  userWorkoutController.addWorkoutToUserAccount,
);
router.get(
  '/workout/all',
  authenticateToken,
  userWorkoutController.getAllUserWorkouts,
);
router.get('/workout/tag/all', userWorkoutController.getAllWorkoutTags);

export = router;
