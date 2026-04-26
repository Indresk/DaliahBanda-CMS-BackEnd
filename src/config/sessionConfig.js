import 'dotenv/config';
import __dirname from '../util/dirname.js';
import sessionFileStore from 'session-file-store';

const SECRET = process.env.SECRET_SESSION;

export function sessionConfig(session) {
	const FileStore = sessionFileStore(session);
	return {
		store: new FileStore({
			path: __dirname + '/localData/sessions',
			ttl: 3600,
			retries: 2,
			logFn: function () {},
		}),
		secret: SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 3600000,
			httpOnly: true,
			secure: false,
		},
	};
}
