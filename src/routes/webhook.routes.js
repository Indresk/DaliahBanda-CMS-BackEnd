import express from 'express';
import { setLiveStatus } from '../services/kick/eventHandlers.js';
import { authUrlBuilder, exchangeCodeForToken } from '../services/kick/auth.js';
import { setSubscriptionToLiveStatus } from '../services/kick/subscriptionManager.js';
import kickWebhookMiddleware from '../middlewares/kickWebhook.js';
import { savePKCE, getPKCE, clearPKCE } from '../util/pkceManager.js';
import { updateGeneralData } from '../db/firestore/liveStatus.js';
import { requireAuth } from '../middlewares/auth.js';

const webhookRoutes = express.Router();

//kick

webhookRoutes.get('/kick/login', requireAuth, (req, res) => {
	const result = authUrlBuilder();
	savePKCE(result.state, result.code_verifier);
	res.redirect(result.url);
});

webhookRoutes.get('/kick/oauth/callback', async (req, res) => {
	try {
		const { code, state, error } = req.query;
		if (error) throw new Error(`OAuth error: ${error}`);
		if (!code || !state) return res.status(400).send('Missing code or state');

		const codeVerifier = getPKCE(state);
		if (!codeVerifier) throw new Error('Missing code_verifier - PKCE failed');

		const tokenData = await exchangeCodeForToken(code, codeVerifier);

		await updateGeneralData('live', {
			kickRefreshToken: tokenData.refresh_token,
		});
		//pendiente - almacenar tambien datos de fecha de caducidad 2meses*

		clearPKCE(state);

		//almacenar access token en DB
		const accessToken = tokenData.access_token;
		await setSubscriptionToLiveStatus(accessToken);
		res.send('OAuth completado y suscripción creada');
	} catch (error) {
		console.error(error);
		res.status(500).send(`OAuth error: ${error.message}`);
	}
});

webhookRoutes.post('/kick', kickWebhookMiddleware, async (req, res) => {
	try {
		//Llamar verifyToken una vez vinculada la recuperación de refresh token de DB
		console.log('Webhook recibido');
		await setLiveStatus(req.body);
		res.sendStatus(200);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
});

export default webhookRoutes;
