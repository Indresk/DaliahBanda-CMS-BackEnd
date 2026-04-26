import db from '../../config/firebase.js';

export async function getUser(email) {
	try {
		const snapshot = await db
			.collection('users')
			.where('email', '==', email)
			.limit(1)
			.get();

		if (snapshot.empty) return null;

		const userDoc = snapshot.docs[0];
		return { id: userDoc.id, ...userDoc.data() };
	} catch (error) {
		throw new Error(`Error solicitando el usuario: ${error.message}`);
	}
}
