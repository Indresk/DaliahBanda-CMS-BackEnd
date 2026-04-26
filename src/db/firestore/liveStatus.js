import db from '../../config/firebase.js';
export async function updateGeneralData(element, newData) {
	try {
		await db.collection('general-data').doc(element).update(newData);
		console.log(newData, ' Enviada correctamente a ', element);
	} catch (error) {
		throw new Error(`Error actualizando la data: ${error.message}`);
	}
}

export async function getGeneralData(element, reqData) {
	try {
		const doc = await db.collection('general-data').doc(element).get();
		if (!doc.exists) {
			throw new Error(`Documento ${element} no encontrado`);
		}
		const generalObject = doc.data();
		return generalObject[reqData];
	} catch (error) {
		throw new Error(`Error solicitando la data: ${error.message}`);
	}
}
