import { updateGeneralData } from '../../db/firestore/liveStatus.js';
import { cacheInvalidate } from '../cache/jsonCache.js';
import { triggerDeploy } from '../vercel/deploy.js';

export async function setLiveStatus(payload) {
	if (!payload) return;
	const isLive = payload.is_live;

	await updateGeneralData('live-public', { status: isLive });

	await cacheInvalidate('content_general-data');
	await cacheInvalidate('content_general-data_live-public');

	if (process.env.VERCEL_DEPLOY_HOOK_URL) {
		triggerDeploy().catch((err) =>
			console.error('Vercel redeploy error:', err.message),
		);
	}

	console.log(isLive ? '🔴 Stream INICIADO' : '⏹️ Stream TERMINADO');
}
