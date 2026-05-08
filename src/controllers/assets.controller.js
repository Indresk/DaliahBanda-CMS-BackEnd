import * as r2 from '../services/r2/storage.js';
import path from 'path';
import crypto from 'crypto';

export async function listAssets(req, res) {
	try {
		const { prefix = '' } = req.query;
		const files = await r2.listFiles(prefix);
		const cleanFiles = files.filter((item) => item.size > 0);
		res.json(cleanFiles);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

export async function uploadAsset(req, res) {
	try {
		if (!req.file) return res.status(400).json({ error: 'Archivo requerido' });
		const ext = path.extname(req.file.originalname);
		const key = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}${ext}`;
		const result = await r2.uploadFile(req.file.buffer, key, req.file.mimetype);
		res.status(201).json(result);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

export async function getAsset(req, res) {
	try {
		const key = decodeURIComponent(req.params.key);
		const metadata = await r2.getFileMetadata(key);
		res.json(metadata);
	} catch {
		res.status(404).json({ error: 'Archivo no encontrado' });
	}
}

export async function deleteAsset(req, res) {
	try {
		await r2.deleteFile(decodeURIComponent(req.params.key));
		res.json({ success: true });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

export async function getPresigned(req, res) {
	try {
		const key = decodeURIComponent(req.params.key);
		const url = await r2.getPresignedUrl(key);
		res.json({ url });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
