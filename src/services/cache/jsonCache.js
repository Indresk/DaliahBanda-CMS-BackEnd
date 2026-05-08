import fs from 'fs/promises';
import path from 'path';
import __dirname from '../../util/dirname.js';

const CACHE_DIR = path.join(__dirname, 'localData/cache');

async function ensureCacheDir() {
	await fs.mkdir(CACHE_DIR, { recursive: true });
}

export async function cacheGet(key) {
	try {
		const raw = await fs.readFile(path.join(CACHE_DIR, `${key}.json`), 'utf8');
		const { data, expiresAt } = JSON.parse(raw);
		if (expiresAt && Date.now() > expiresAt) {
			await cacheInvalidate(key);
			return null;
		}
		return data;
	} catch {
		return null;
	}
}

export async function cacheSet(key, data, ttlSeconds = 300) {
	await ensureCacheDir();
	const payload = {
		data,
		createdAt: Date.now(),
		expiresAt: ttlSeconds > 0 ? Date.now() + ttlSeconds * 1000 : null,
	};
	await fs.writeFile(
		path.join(CACHE_DIR, `${key}.json`),
		JSON.stringify(payload),
		'utf8',
	);
}

export async function cacheInvalidate(key) {
	try {
		await fs.unlink(path.join(CACHE_DIR, `${key}.json`));
	} catch {}
}

export async function cacheInvalidatePrefix(prefix) {
	try {
		await ensureCacheDir();
		const files = await fs.readdir(CACHE_DIR);
		await Promise.all(
			files
				.filter((f) => f.startsWith(prefix))
				.map((f) => fs.unlink(path.join(CACHE_DIR, f)).catch(() => {})),
		);
	} catch {}
}
