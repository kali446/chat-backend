import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import passportFacebook from "passport-facebook";
import config from "config";
import User from "../models/user";
const GoogleStrategy = passportGoogle.Strategy;
const FacebookStrategy = passportFacebook.Strategy;
import { UserBody } from "../interface/user";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.get("googleClientId"),
      clientSecret: config.get("googleClientSecret"),
      callbackURL: config.get("googleOauthRedirect"),
    },
    async (accessToken, refreshToken, profile, done) => {
      // get profile details
      const userObj: UserBody = {
        name: profile._json.name,
        email: profile._json.email,
        provider: "Google",
        providerId: profile._json.sub,
        avatar: profile._json.picture,
        verified: true,
      };

      const user = await User.findOne({ email: userObj.email });

      if (!user) {
        // If user doesn't exist creates a new user. (similar to sign up)
        const newUser = await User.create(userObj);

        if (newUser) {
          done(null, newUser);
        }
      } else {
        done(null, user);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: config.get("facebookAppId"),
      clientSecret: config.get("facebookAppSecret"),
      callbackURL: config.get("facebookOauthRedirect"),
      profileFields: ["id", "displayName", "email", "profileUrl", "name"],
    },
    async (accessToken, refreshToken, profile, done) => {
      // get profile details
      const userObj: UserBody = {
        name: profile._json.name,
        email: profile._json.email,
        provider: "Facebook",
        providerId: profile._json.id,
        verified: true,
      };

      const user = await User.findOne({ email: userObj.email });

      if (!user) {
        // If user doesn't exist creates a new user. (similar to sign up)
        const newUser = await User.create(userObj);

        if (newUser) {
          done(null, newUser);
        }
      } else {
        done(null, user);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
