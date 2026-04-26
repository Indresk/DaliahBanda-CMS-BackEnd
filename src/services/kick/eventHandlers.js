import { updateGeneralData } from '../../db/firestore/liveStatus.js';

export async function setLiveStatus(payload) {
	if (!payload) return;
	console.log('Evento Kick:', payload);
	const isLive = payload.is_live;
	await updateGeneralData('live-public', { status: isLive });
	console.log(isLive ? '🔴 Stream INICIADO' : '⏹️ Stream TERMINADO');
}
