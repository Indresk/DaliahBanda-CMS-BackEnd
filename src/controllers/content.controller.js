import {
	getCollection,
	getDocument,
	createDocument,
	updateDocument,
	deleteDocument,
} from '../db/firestore/content.js';
import {
	cacheGet,
	cacheSet,
	cacheInvalidate,
} from '../services/cache/jsonCache.js';
import { triggerDeploy } from '../services/vercel/deploy.js';

const CACHE_TTL = 300;

function cacheKey(collection, id) {
	return id ? `content_${collection}_${id}` : `content_${collection}`;
}

async function maybeRedeploy() {
	if (!process.env.VERCEL_DEPLOY_HOOK_URL) return;
	triggerDeploy().catch((err) =>
		console.error('Vercel deploy error:', err.message),
	);
}

export async function list(req, res) {
	try {
		const { collection } = req.params;
		const key = cacheKey(collection);
		const cached = await cacheGet(key);
		if (cached) return res.json(cached);

		const data = await getCollection(collection);
		await cacheSet(key, data, CACHE_TTL);
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

export async function getOne(req, res) {
	try {
		const { collection, id } = req.params;
		const key = cacheKey(collection, id);
		const cached = await cacheGet(key);
		if (cached) return res.json(cached);

		const data = await getDocument(collection, id);
		if (!data) return res.status(404).json({ error: 'No encontrado' });
		await cacheSet(key, data, CACHE_TTL);
		res.json(data);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

export async function create(req, res) {
	try {
		const { collection } = req.params;
		const id = await createDocument(collection, req.body);
		await cacheInvalidate(cacheKey(collection));
		// await maybeRedeploy(); // revisar si la implementación de este sistema es realmente necesaria
		res.status(201).json({ id });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

export async function update(req, res) {
	try {
		const { collection, id } = req.params;
		await updateDocument(collection, id, req.body);
		await cacheInvalidate(cacheKey(collection));
		await cacheInvalidate(cacheKey(collection, id));
		// await maybeRedeploy(); // revisar si la implementación de este sistema es realmente necesaria
		res.json({ success: true });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

export async function remove(req, res) {
	try {
		const { collection, id } = req.params;
		await deleteDocument(collection, id);
		await cacheInvalidate(cacheKey(collection));
		await cacheInvalidate(cacheKey(collection, id));
		res.json({ success: true });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
