import { Request, Response, Router } from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { CreateUserServices } from './services/user/CreateUserServices';
import { AuthUserServices } from './services/user/AuthUserServices';

require('dotenv').config();

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

const routesGoogle = Router();

routesGoogle.use(
    session({
        secret: 'mysecret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    })
);

routesGoogle.use(passport.initialize());
routesGoogle.use(passport.session());

var redirectUrl = '';

routesGoogle.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/auth/google/failure',
}), (req, res) => {
    res.redirect(redirectUrl === 'create' ? '/create/protected' : '/auth/protected');
});

routesGoogle.get('/auth/google', (req, res, next) => {
    redirectUrl = 'auth';
    passport.authenticate('google', {
        scope: ['email', 'profile'],
    })(req, res, next);
});

routesGoogle.get('/auth/protected', async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        const userData: any = req.user;
        const { sub, email } = userData._json;
            const authUserServices = new AuthUserServices();
            const authUser = await authUserServices.execute({
                email,
                sub,
            });
            return res.json(authUser);
    } else {
        return res.status(401).json({ error: 'Não autorizado' });
    }
});

routesGoogle.get('/create/google', (req, res, next) => {
    redirectUrl = 'create';
    passport.authenticate('google', {
        scope: ['email', 'profile'],
    })(req, res, next);
});

routesGoogle.get('/create/protected', async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        const userData: any = req.user;
        const { sub, name, email, picture } = userData._json;
            const createUserService = new CreateUserServices();
            const createUser = await createUserService.execute({
                email,
                name,
                sub,
                photo: picture
            });
            return res.json(createUser);
    } else {
        return res.status(401).json({ error: 'Não autorizado' });
    }
});

export { routesGoogle };
