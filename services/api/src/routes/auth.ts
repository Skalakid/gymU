import express from 'express';
import * as authController from '../controllers/authController';

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/token', authController.refreshToken);
router.delete('/logout', authController.logout);

export = router;
