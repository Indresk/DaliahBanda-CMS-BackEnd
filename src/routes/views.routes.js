import express from 'express';
import componentMap from '../react/componentMap.js';
import {
	requireAuth,
	requireGuest,
	sessionState,
} from '../middlewares/auth.js';

const viewsRoutes = express.Router();

const navLinks = [
	{ link: '/cms/', name: 'Dashboard' },
	{ link: '/cms/content', name: 'Contenido' },
	{ link: '/cms/assets', name: 'Assets' },
];

const globalObject = { styles: '/css/styles.css', navLinks };

viewsRoutes.use((req, res, next) => {
	res.locals.globalInfo = globalObject;
	next();
});

function renderCMS(res, viewName, pagePath, options = {}) {
	const components = componentMap
		.filter((e) => e.pages.includes(pagePath) || e.pages.includes('global'))
		.map((e) => ({ ...e }));

	return res.render(`cms/${viewName}`, {
		layout: 'cms',
		components,
		...options,
	});
}

viewsRoutes.use(sessionState);

viewsRoutes.get('/login', requireGuest, (req, res) => {
	res.render('login', {
		layout: 'auth',
		metaInfo: { title: 'Login' },
		error: req.query.error,
	});
});

viewsRoutes.use(requireAuth);

viewsRoutes.get('/', (req, res) => {
	renderCMS(res, 'dashboard', '/', { metaInfo: { title: 'Dashboard' } });
});

viewsRoutes.get('/content', (req, res) => {
	renderCMS(res, 'content', '/content', { metaInfo: { title: 'Contenido' } });
});

viewsRoutes.get('/assets', (req, res) => {
	renderCMS(res, 'assets', '/assets', { metaInfo: { title: 'Assets' } });
});

export default viewsRoutes;
