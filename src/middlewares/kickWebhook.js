import crypto from 'crypto';
import getRawBody from 'raw-body';

const KICK_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq/+l1WnlRrGSolDMA+A8
6rAhMbQGmQ2SapVcGM3zq8ANXjnhDWocMqfWcTd95btDydITa10kDvHzw9WQOqp2
MZI7ZyrfzJuz5nhTPCiJwTwnEtWft7nV14BYRDHvlfqPUaZ+1KR4OCaO/wWIk/rQ
L/TjY0M70gse8rlBkbo2a8rKhu69RQTRsoaf4DVhDPEeSeI5jVrRDGAMGL3cGuyY
6CLKGdjVEM78g3JfYOvDU/RvfqD7L89TZ3iN94jrmWdGz34JNlEI5hqK8dd7C5EF
BEbZ5jgB8s8ReQV8H+MkuffjdAj3ajDDX3DOJMIut1lBrUVD1AaSrGCKHooWoL2e
twIDAQAB
-----END PUBLIC KEY-----`;

const kickWebhookMiddleware = async (req, res, next) => {
	if (req.method !== 'POST') return next();
	try {
		const rawBody = await getRawBody(req);
		req.rawBody = rawBody.toString('utf8');

		const publicKey = KICK_PUBLIC_KEY;
		const signature = req.headers['kick-event-signature'];
		const messageId = req.headers['kick-event-message-id'];
		const timestamp = req.headers['kick-event-message-timestamp'];

		if (!signature)
			return res.status(401).json({ error: 'Signature requerida' });

		if (signature && publicKey) {
			const isValid = await verifyWebhookInfo(
				publicKey,
				signature,
				messageId,
				timestamp,
				req.rawBody,
			);
			if (!isValid) {
				console.log('Firma Kick inválida');
				return res.status(401).json({ error: 'Firma inválida' });
			}
			console.log('Firma Kick verificada');
		}
		req.body = JSON.parse(req.rawBody);
		next();
	} catch (error) {
		console.error('Error middleware webhook:', error);
		res.status(400).json({ error: 'Body inválido' });
	}
};

async function verifyWebhookInfo(
	publicKeyPem,
	signatureBase64,
	messageId,
	timestamp,
	rawBody,
) {
	try {
		const toSign = `${messageId}.${timestamp}.${rawBody}`;

		const verifier = crypto.createVerify('RSA-SHA256');
		verifier.update(toSign);

		const signatureBuffer = Buffer.from(signatureBase64, 'base64');
		const isValid = verifier.verify(publicKeyPem, signatureBuffer);

		return isValid;
	} catch (error) {
		console.error('Error crypto Kick:', error.message);
		return false;
	}
}

export default kickWebhookMiddleware;
