import express from 'express';
import { login, logout } from '../controllers/auth.controller.js';
import { loginLimiter } from '../middlewares/rateLimiters.js';

const authRoutes = express.Router();
authRoutes.use(express.urlencoded({ extended: true }));

authRoutes.post('/login', loginLimiter, login);
authRoutes.post('/logout', logout);

export default authRoutes;
