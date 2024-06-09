import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

router.get('/login', authController.login);
router.post('/signup', authController.signup);

export = router;
