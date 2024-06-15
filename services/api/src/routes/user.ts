import express from 'express';
import * as userController from '../controllers/userController';
import { authenticateToken } from '../middlewares/authTokenMiddleware';

const router = express.Router();

router.get('/current', authenticateToken, userController.getCurrentUser);
router.get('/all', authenticateToken, userController.getAllUsers);

export = router;
