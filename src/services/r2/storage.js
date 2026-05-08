import {
	PutObjectCommand,
	HeadObjectCommand,
	DeleteObjectCommand,
	ListObjectsV2Command,
	GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import r2Client, { BUCKET, PUBLIC_URL } from '../../config/r2Config.js';

export async function uploadFile(buffer, key, contentType) {
	await r2Client.send(
		new PutObjectCommand({
			Bucket: BUCKET,
			Key: key,
			Body: buffer,
			ContentType: contentType,
		}),
	);
	return { key, url: `${PUBLIC_URL}/${key}` };
}

export async function getFileMetadata(key) {
	const head = await r2Client.send(
		new HeadObjectCommand({ Bucket: BUCKET, Key: key }),
	);
	return {
		key,
		url: `${PUBLIC_URL}/${key}`,
		size: head.ContentLength,
		contentType: head.ContentType,
		lastModified: head.LastModified,
	};
}

export async function getPresignedUrl(key, expiresIn = 3600) {
	return getSignedUrl(
		r2Client,
		new GetObjectCommand({ Bucket: BUCKET, Key: key }),
		{ expiresIn },
	);
}

export async function deleteFile(key) {
	await r2Client.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
}

export async function listFiles(prefix = '') {
	const response = await r2Client.send(
		new ListObjectsV2Command({ Bucket: BUCKET, Prefix: prefix }),
	);
	return (response.Contents || []).map((obj) => ({
		key: obj.Key,
		url: `${PUBLIC_URL}/${obj.Key}`,
		size: obj.Size,
		lastModified: obj.LastModified,
	}));
}
