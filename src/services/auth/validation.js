import { getUser } from '../../db/firestore/auth.js';
import { verifyPassword } from './hashing.js';

export async function validateUser(email, password) {
	if (!email || !password) return null;
	const internalResponse = await getUser(email);
	if (!internalResponse) return null;
	if (await verifyPassword(password, internalResponse.password))
		return { id: internalResponse.id, email, role: internalResponse.role };
}
