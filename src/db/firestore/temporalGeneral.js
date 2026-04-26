import db from '../../config/firebase.js';
export async function addFireData(newData) {
	try {
		const itemSended = await db.collection('general-data').add(newData);
		return itemSended.id;
	} catch (error) {
		throw new Error(`Error registrando el producto: ${error.message}`);
	}
}

export async function getFireData() {
	try {
		const dataToDeliver = [];
		const snapshot = await db.collection('general-data').get();
		snapshot.forEach((doc) => {
			dataToDeliver.push({ ...doc.data(), id: doc.id });
		});
		return dataToDeliver;
	} catch (error) {
		throw new Error(`Error solicitando el/los productos: ${error.message}`);
	}
}
