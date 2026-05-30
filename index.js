import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import handlebars from 'express-handlebars';
import __dirname from './src/util/dirname.js';
import handlebarsHelpers from './src/config/handlebarsHelpers.js';
import session from 'express-session';
import { sessionConfig } from './src/config/sessionConfig.js';
import viewsRoutes from './src/routes/views.routes.js';
import apiRoutes from './src/routes/api.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import webhookRoutes from './src/routes/webhook.routes.js';
import eraseSessions from './src/db/fileSystem/eraseSessions.js';

const PORT = process.env.PORT || 10000;
const FRONT_URL = process.env.FRONT_URL || 'https://daliahbanda.com';

eraseSessions();

const app = express();

app.use(cors({ origin: [FRONT_URL], credentials: true }));
app.set('trust proxy', 1);
app.use(session(sessionConfig(session)));

app.engine('handlebars', handlebars.engine(handlebarsHelpers));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/src/views');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.redirect(FRONT_URL));
app.use('/cms', viewsRoutes);
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/webhook', webhookRoutes);

app.listen(PORT, () => {
	console.log(`Server on: http://localhost:${PORT}/cms`);
});
