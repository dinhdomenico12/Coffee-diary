const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/mdiary');

passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK
      },
      function(accessToken, refreshToken, profile, cb) {
      // a user has logged in with OAuth...
      console.log(profile)
            User.findOne({'googleId': profile.id}, function(err, user){
                  console.log('this is the profile',profile)
                  if (err) return cb(err);
                  if(user) { 
                        console.log('user exists', user)
                        return cb(null, user);
                  }else { 
                        console.log('user does not exist', user)
                        var newUser = new User ({
                              name: profile.displayName,
                              email: profile.emails[0].value,
                              googleId: profile.id
                        });
                        console.log('this is newuser', newUser)
                        newUser.save(function(err) {
                              if(err) return cb(err);
                              return cb(null, newUser);
                        });
                  }
            });
      }
));

passport.serializeUser(function(user, done) {
      done(null, user.id);
});

passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
            done(err, user);
      });
});