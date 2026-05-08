import { S3Client } from '@aws-sdk/client-s3';

const r2Client = new S3Client({
	region: 'auto',
	endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
	credentials: {
		accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
		secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
	},
});

export const BUCKET = process.env.CLOUDFLARE_R2_BUCKET_NAME;
export const PUBLIC_URL = process.env.CLOUDFLARE_R2_PUBLIC_URL;

export default r2Client;
