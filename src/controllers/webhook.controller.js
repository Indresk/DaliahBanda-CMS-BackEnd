import { setLiveStatus } from '../services/kick/eventHandlers.js';
import { authUrlBuilder, exchangeCodeForToken } from '../services/kick/auth.js';
import { setSubscriptionToLiveStatus } from '../services/kick/subscriptionManager.js';
import { savePKCE, getPKCE, clearPKCE } from '../util/pkceManager.js';
import { updateGeneralData } from '../db/firestore/liveStatus.js';

export function kickLogin(req, res) {
	const result = authUrlBuilder();
	savePKCE(result.state, result.code_verifier);
	res.redirect(result.url);
}

export async function kickOAuthCallback(req, res) {
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
		clearPKCE(state);

		await setSubscriptionToLiveStatus(tokenData.access_token);
		res.send('OAuth completado y suscripción creada');
	} catch (error) {
		console.error(error);
		res.status(500).send(`OAuth error: ${error.message}`);
	}
}

export async function kickWebhook(req, res) {
	try {
		await setLiveStatus(req.body);
		res.sendStatus(200);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
}
