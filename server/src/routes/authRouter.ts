import { Request, Response, NextFunction, Router } from "express";
import passport from "passport";
// import { loginSuccess } from '../controllers/authController'
require('dotenv').config()

export const authRoutes = Router()
const client_url = process.env.URL_CLIENT || 'http://localhost:3000/'
// localhost:5000/api/auth/google
// redirect users to the Google consent screen
authRoutes.get('/google',
    // chạy chiến dịch google trong file passport
    passport.authenticate("google", { scope: ["email", "profile"] }));

// after login with google, it redirects to this callback route 
authRoutes.get('/google/callback',
    passport.authenticate("google", {
        // successRedirect: client_url,    
        failureRedirect: "/login/failed",
    }),
    (req, res) => {
        res.redirect(client_url)
    }
)

authRoutes.get('/facebook',
    passport.authenticate('facebook', {scope: ['email'] }));

authRoutes.get('/facebook/callback',
    passport.authenticate('facebook', {
        // successRedirect: client_url,    
        failureRedirect: "/login/failed",
    }),
    (req, res) => {
        res.redirect(client_url)
    }
)

// authRoutes.get('/login/success', loginSuccess)

authRoutes.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

authRoutes.get("/login/success", (req, res) => {
    console.log(req.user);

	if (!!req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

authRoutes.get("/logout", (req, res: Response, next: NextFunction) => {
    req.session = undefined;
    res.redirect(client_url);
});