import express, { Request, Response, NextFunction, Router } from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
require('dotenv').config();
import { CreateUserServices } from './services/user/CreateUserServices';
import { AuthUserServices } from './services/user/AuthUserServices';

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLECLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: `${process.env.APIURL}/auth/google/callback`,
            passReqToCallback: true
        },
        function (request, accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user || undefined);
});

const authRoutes = Router();

authRoutes.use(
    session({
        secret: 'mysecret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    })
);

authRoutes.use(passport.initialize());
authRoutes.use(passport.session());

authRoutes.get('/create/google', (req, res, next) => {
    passport.authenticate('google', {
        scope: ['email', 'profile'],
        successRedirect: '/create/protected', 
        failureRedirect: '/auth/google/failure'
    })(req, res, next);
});

authRoutes.get(
    '/auth/google/callback',
    (req, res, next) => {
        passport.authenticate('google', (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.redirect('/auth/google/failure');
            }

            const redirectRoute = req.originalUrl.includes('/create/google') 
                ? '/create/protected' 
                : '/auth/protected';
            req.logIn(user, (loginErr) => {
                if (loginErr) {
                    return next(loginErr);
                }
                return res.redirect(redirectRoute);
            });
        })(req, res, next);
    }
);

authRoutes.get('/create/protected', async(req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        const userData: any = req.user;
        const { sub, name, email, picture } = userData._json;
        try {
            const createUserService = new CreateUserServices();
            var createuser = await createUserService.execute({
                email,
                name,
                sub,
                photo: picture
            });       
        } catch (error) {
            return res.json(createuser);
        }
    } else {
        return res.status(401).json({ error: 'Não autorizado' });
    }
});

authRoutes.get('/auth/google', (req, res, next) => {
    passport.authenticate('google', {
        scope: ['email', 'profile'],
        successRedirect: '/auth/protected', 
        failureRedirect: '/auth/google/failure'
    })(req, res, next);
});

authRoutes.get('/auth/protected', async(req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        const userData: any = req.user;
        const { sub, email } = userData._json;
        try {
            const authUserServices = new AuthUserServices();
            const authUser = await authUserServices.execute({
                email,
                sub,
            });
            return res.json(authUser);
        } catch (error) {
            console.log('Erro ao autenticar usuário. ' + error);
            return res.status(500).json({ error: 'Erro ao autenticar usuário.' });
        }
    } else {
        return res.status(401).json({ error: 'Não autorizado' });
    }
});


export { authRoutes };
