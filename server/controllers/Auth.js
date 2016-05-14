var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var authHelper = require('../helpers/authentication');
var Constants = require('../config/constants');
var keys = require('../config/config.js');
var errors = require('common-errors');
var debug = require('debug')('sw-auth');
var Users = require('./Users')


// //passport support for persistent login sessions
passport.serializeUser(function(user, cb) {
  return cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
  return cb(null, obj);
});

var fbOptions = {
  clientID        : keys.FACEBOOK_CLIENTID,
  clientSecret    : keys.FACEBOOK_CLIENTSECRET,
  callbackURL     : Constants.FACEBOOK_CALLBACK,
  profileFields   : ['id', 'emails', 'name'],
  passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

}
console.log(fbOptions);
// passport facebook strategy (email and passwork signin)
// =========================================================================
passport.use(new FacebookStrategy(fbOptions,
  function(req, accessToken, refreshToken, profile, done) {
    console.log('ininin');
    var user = profile;
    user.accessToken = accessToken;
    return Users.addFacebookUser(user)
    .then(function(userFromDb) {
      if(!userFromDb) {
        return done(null, false, { message: 'unable to add user' });
      } else if(userFromDb === 'user already exists') {
        return done(null, userFromDb);
      }
      
      return done(null, userFromDb);
    })
    .catch(function(err){
      var e = errors.Error('An error occurred during facebook login', err);
    })
  }
));

module.exports = {
  signOut: function(req, res, next) {
    res.clearCookie('isLoggedIn')
    req.logout();
    return res.status(201).send('signed out');
  },

  facebookLogin: function() {
    return passport.authenticate('facebook', { scope: 'email'});
  },
  ensureAuthenticated: function(req, res, next) {
    console.log(req.isAuthenticated);
    if(req.isAuthenticated()) {
      console.log('req.authenticated is true', req.user);
      return next();
    } else {
        console.log('req.authenticated is FALSE');
      return res.redirect(401, '/signin');
    }
  },
  getUser: function(req, res) {
    var user = req.user;
    console.log('inuserr', user);
    res.status(200).send(user)
  }
};