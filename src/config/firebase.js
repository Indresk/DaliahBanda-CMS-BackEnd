import 'dotenv/config';
import fireAdmin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.SECRET_FIREKEY);

fireAdmin.initializeApp({
	credential: fireAdmin.credential.cert(serviceAccount),
});

const db = fireAdmin.firestore();

export default db;
