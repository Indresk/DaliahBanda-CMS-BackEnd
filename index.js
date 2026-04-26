import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import handlebars from 'express-handlebars';
import __dirname from './src/util/dirname.js';
import viewsRoutes from './src/routes/views.routes.js';
import handlebarsHelpers from './src/config/handlebarsHelpers.js';
import session from 'express-session';
import { sessionConfig } from './src/config/sessionConfig.js';
import apiRoutes from './src/routes/api.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import eraseSessions from './src/db/fileSystem/eraseSessions.js';
import webhookRoutes from './src/routes/webhook.routes.js';

const PORT = process.env.PORT;
const FRONT_URL = process.env.FRONT_URL || 'https://daliahbanda.com';
eraseSessions();

const sessionConfigOpt = sessionConfig(session);

const app = express();

app.use(
	cors({
		origin: [FRONT_URL],
		credentials: true,
	}),
);
app.set('trust proxy', 1);
app.use(session(sessionConfigOpt));

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

app.engine('handlebars', handlebars.engine(handlebarsHelpers));

app.set('view engine', 'handlebars');
app.set('views', __dirname + '/src/views');
app.set('partials', __dirname + '/src/views/partials');

app.use(express.static(__dirname + '/public'));

app.use('/cms', viewsRoutes);
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/webhook', webhookRoutes);
