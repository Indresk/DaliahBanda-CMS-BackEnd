import db from '../../config/firebase.js';

const now = () => new Date().toISOString();

export async function getCollection(collectionName) {
	const snapshot = await db.collection(collectionName).get();
	return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getDocument(collectionName, id) {
	const doc = await db.collection(collectionName).doc(id).get();
	if (!doc.exists) return null;
	return { id: doc.id, ...doc.data() };
}

export async function createDocument(collectionName, data) {
	const ref = await db
		.collection(collectionName)
		.add({ ...data, createdAt: now(), updatedAt: now() });
	return ref.id;
}

export async function updateDocument(collectionName, id, data) {
	await db
		.collection(collectionName)
		.doc(id)
		.update({ ...data, updatedAt: now() });
}

export async function deleteDocument(collectionName, id) {
	await db.collection(collectionName).doc(id).delete();
}
