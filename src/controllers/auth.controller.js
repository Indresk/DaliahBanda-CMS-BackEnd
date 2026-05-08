import { validateUser } from '../services/auth/validation.js';

export async function login(req, res) {
	try {
		const { email, password } = req.body;
		const user = await validateUser(email, password);

		if (!user) {
			return res
				.status(401)
				.redirect('/cms/login?error=credenciales%20inv%C3%A1lidas');
		}

		req.session.regenerate((err) => {
			if (err) throw new Error(err);
			req.session.user = { id: user.id, email: user.email, role: user.role };
			req.session.isAuthenticated = true;
			req.session.save((err) => {
				if (err) throw new Error(err);
				res.redirect('/cms/');
			});
		});
	} catch (error) {
		res
			.status(500)
			.redirect(`/cms/login?error=${encodeURIComponent(error.message)}`);
	}
}

export function logout(req, res) {
	req.session.destroy((err) => {
		if (err) return res.status(500).redirect('/cms/');
		res.clearCookie('connect.sid');
		res.redirect('/cms/login');
	});
}
