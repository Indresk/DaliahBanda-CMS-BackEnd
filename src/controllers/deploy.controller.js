import { triggerDeploy } from '../services/vercel/deploy.js';

export async function deploy(req, res) {
	try {
		const result = await triggerDeploy();
		res.json({ success: true, deploy: result });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
