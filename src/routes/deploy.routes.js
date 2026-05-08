import express from 'express';
import { deploy } from '../controllers/deploy.controller.js';
import { requireAuth } from '../middlewares/auth.js';

const deployRoutes = express.Router();

deployRoutes.post('/trigger', requireAuth, deploy);

export default deployRoutes;
