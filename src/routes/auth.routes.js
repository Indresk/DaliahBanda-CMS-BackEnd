import express from 'express';
import { validateUser } from '../services/auth/validation.js';

const authRoutes = express.Router();
authRoutes.use(express.urlencoded({ extended: true }));

authRoutes.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await validateUser(email, password);

		if (!user) {
			return res.status(401).redirect('/cms/login?error=invalid%20credentials');
		}

		req.session.regenerate((err) => {
			if (err) throw new Error(err);

			req.session.user = {
				id: user.id,
				email: user.email,
				role: user.role,
			};

			req.session.isAuthenticated = true;

			req.session.save((err) => {
				if (err) throw new Error(err);
				res.redirect('/cms/');
			});
		});
	} catch (error) {
		res.status(401).redirect(`/cms/login?error=${error.message}`);
	}
});

authRoutes.post('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (err) return res.status(401).redirect(`/cms/`);

		res.clearCookie('connect.sid');
		res.redirect('/cms/login');
	});
});

export default authRoutes;
