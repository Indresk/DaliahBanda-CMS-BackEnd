import { S3Client } from '@aws-sdk/client-s3';

const {
	CLOUDFLARE_R2_ENDPOINT,
	CLOUDFLARE_ACCESS_KEY_ID,
	CLOUDFLARE_SECRET_ACCESS_KEY,
	CLOUDFLARE_R2_BUCKET_NAME,
	CLOUDFLARE_R2_PUBLIC_URL,
} = process.env;

const r2Client = new S3Client({
	region: 'auto',
	endpoint: CLOUDFLARE_R2_ENDPOINT,
	credentials: {
		accessKeyId: CLOUDFLARE_ACCESS_KEY_ID,
		secretAccessKey: CLOUDFLARE_SECRET_ACCESS_KEY,
	},
});

export const BUCKET = CLOUDFLARE_R2_BUCKET_NAME;
export const PUBLIC_URL = CLOUDFLARE_R2_PUBLIC_URL;

export default r2Client;
