import express from 'express';
import kickWebhookMiddleware from '../middlewares/kickWebhook.js';
import {
	kickLogin,
	kickOAuthCallback,
	kickWebhook,
} from '../controllers/webhook.controller.js';
import { requireAuth } from '../middlewares/auth.js';

const webhookRoutes = express.Router();

webhookRoutes.get('/kick/login', requireAuth, kickLogin);
webhookRoutes.get('/kick/oauth/callback', kickOAuthCallback);
webhookRoutes.post('/kick', kickWebhookMiddleware, kickWebhook);

export default webhookRoutes;
