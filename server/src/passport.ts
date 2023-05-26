// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
import { User } from "./models/user.model";
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()
import passport from "passport";
import passportGoogle from "passport-google-oauth20";
const GoogleStrategy = passportGoogle.Strategy;

passport.use(
    new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET  as string,
        callbackURL: "/api/auth/google/callback"
    },
    async function (accessToken: string, refreshToken: string, profile: any, callback: any) {
        // create user

        const tokenLogin = uuidv4()
        profile.tokenLogin = tokenLogin
        
        try {
            if (profile?.id) {
                const user = await User.findOne({ where: { email: profile.emails[0]?.value } });
                
                if (!user) {
                    const newUser = await User.create({
                        id: profile.id,
                        email: profile.emails[0]?.value,
                        typeLogin: profile?.provider,
                        name: profile?.displayName,
                        avatarUrl: profile?.photos[0]?.value,
                        tokenLogin
                    })

                    if (newUser) {
                        callback(null, newUser)
                    }
                } else {
                    callback(null, user)
                }
            }
        } catch (error) {
            callback(error, null)
        }
    }
));

passport.use(
    new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['email', 'photos', 'id', 'displayName']
    },
    async function (accessToken: string, refreshToken: string, profile: any, callback: any) {
        const tokenLogin = uuidv4()
        profile.tokenLogin = tokenLogin
        
        try {
            if (profile?.id) {
                const user = await User.findOne({ where: { email: profile.emails[0]?.value } });
                
                if (!user) {
                    const newUser = await User.create({
                        id: profile.id,
                        email: profile.emails[0]?.value,
                        typeLogin: profile?.provider,
                        name: profile?.displayName,
                        avatarUrl: profile?.photos[0]?.value,
                        tokenLogin
                    })

                    if (newUser) {
                        callback(null, newUser)
                    }
                } else {
                    callback(null, user)
                }
            }
        } catch (error) {
            callback(error, null)
        }
    }
));

//  stores it in a cookie
passport.serializeUser((user: any, done: any) => {
    done(null, user.email);
});

// reads the cookie and gets the stored user id,  can be accessed through req.user
passport.deserializeUser(async (email: any, done: any) => {
    const user = await User.findByPk(email as string,{
        attributes: ['email', 'role', 'name', 'avatarUrl']
      });
    console.log(user);
    
    done(null, user);
});