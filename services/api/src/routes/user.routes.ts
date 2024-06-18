import express from 'express';
import * as userController from '../controllers/user.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/all', authenticateToken, userController.getAllUsers);

export = router;
