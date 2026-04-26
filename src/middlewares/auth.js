export function requireAuth(req, res, next) {
	if (req.session && req.session.isAuthenticated) {
		return next();
	}

	return res.redirect(
		'/cms/login?error=need%20login%20to%20access%20that%20route',
	);
}

export function requireGuest(req, res, next) {
	if (req.session && req.session.isAuthenticated) {
		return res.redirect('/cms/');
	}

	next();
}

export function sessionState(req, res, next) {
	res.locals.isAuthenticated = !!req.session?.isAuthenticated;
	res.locals.sessionUser = req.session?.user || null;
	next();
}
