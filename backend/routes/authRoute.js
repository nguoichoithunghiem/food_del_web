import express from 'express';
import { loginUser } from '../controllers/authController.js';

const authRouter = express.Router();

// Route đăng nhập
authRouter.post('/login', loginUser);

export default authRouter;
