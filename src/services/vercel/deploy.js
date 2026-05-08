export async function triggerDeploy() {
	const url = process.env.VERCEL_DEPLOY_HOOK_URL;
	if (!url) throw new Error('VERCEL_DEPLOY_HOOK_URL no configurado');

	const response = await fetch(url, { method: 'POST' });
	if (!response.ok) {
		const text = await response.text();
		throw new Error(`Vercel deploy error: ${text}`);
	}
	return response.json();
}
