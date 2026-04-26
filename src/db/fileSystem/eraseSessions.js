import fs from 'fs/promises';
import path from 'path';
import __dirname from '../../util/dirname.js';

const sessionsDir = path.join(__dirname, 'localData/sessions');

export default async function eraseSessions() {
	try {
		const sessionFiles = await fs.readdir(sessionsDir);

		await Promise.all(
			sessionFiles.map((sessionFile) =>
				fs.unlink(path.join(sessionsDir, sessionFile)),
			),
		);
	} catch (error) {
		console.error('Error cleaning sessions: ', error.message);
	}
}
