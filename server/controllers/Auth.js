var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var authHelper = require('../helpers/authentication');
var Constants = require('../config/constants');
var keys = require('../config/config.js');
var errors = require('common-errors');
var debug = require('debug')('sw-auth');


// //passport support for persistent login sessions
passport.serializeUser(function(user, cb) {
  return cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
  return cb(null, obj);
});

// passport local strategy (email and password signin)
// =========================================================================
passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    authHelper.authenticate(email, password, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, { message: 'Invalid email or password.' });
      }

      return done(null, user);
    });
  }
));

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(req, email, password, done) {
    var user = req.body;

    return User.addUser(user)
    .then(function(userFromDb) {
      // if(!userFromDb) {
      //   return done(null, false, { message: 'unable to add user' });
      // }
      return done(null, userFromDb);
    })
    .catch(done)
  }
));

// passport facebook strategy (email and passwork signin)
// =========================================================================
passport.use(new FacebookStrategy({
  clientID        : keys.FACEBOOK_CLIENTID,
  clientSecret    : keys.FACEBOOK_CLIENTSECRET,
  callbackURL     : Constants.FACEBOOK_CALLBACK,
  profileFields   : ['id', 'emails', 'name'],
  passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

},
  function(req, accessToken, refreshToken, profile, done) {
    var user = profile;
    user.accessToken = accessToken;
    return User.addFacebookUser(user)
    .then(function(userFromDb) {
      return User.setEmailVerifiedToTrue(userFromDb)
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
    })
    
  }
));


module.exports = {
  signUp: function(req, res, next) {
    console.log('insignup');
    var authFailedMsg = 'An error occurred during signup. Please try again later.'

    passport.authenticate('local-signup', function(err, user) {
      if (err) {
        var e, status;

        if (err instanceof errors.AlreadyInUseError) {
          e = errors.Error('User already exists', err);
          //debug('User already exists');
          status = 409;
        } else {
          e = errors.Error(authFailedMsg, err);
          status = 500;
          debug(e);
        }


        return res.status(status).json({
          ok: false,
          errorMessage: e.message
        });
      }

      if(user) {
        req.logIn(user, function(err) {
          if(err) {
            return res.status(401)
            .json({
              ok: false,
              errorMessage: 'Unable to login user.'
            });
          }
          user = user.toJSON();
          User.setEmailVerifiedToFalse(user);
          SendgridHelper.sendEmailVerification(user);
          res.cookie('isLoggedIn', true)
          return res.status(201).send(user);
        });
      } else {
        return res.status(401)
        .json({
          ok: false,
          errorMessage: 'Unable to add user.'
        });
      }
    })(req, res, next);
  },
  signIn: function(req, res, next) {
    var authFailedMsg = 'An error occurred while authenticating. Please try again later.'

    passport.authenticate('local-signin', function(err, user) {
      //err = new Error('error');
      if (err) { // maybe db connection is lost, can't attempt auth
        // show message about having system issues
        // maybe ask to retry
        var e = errors.Error(authFailedMsg, err)

        debug(e);

        return res.status(500).json({
          ok: false,
          errorMessage: e.message
        })
        //return next(e) // deal with a 500 on the client side
        // TODO: check if 500 can contain JSON body
      }

      if (user) {
        req.logIn(user, function(err) {
          if(err) {
            var e = errors.Error(authFailedMsg, err)
            debug(e);
            return res.status(500).json({
              ok: false,
              errorMessage: e.message
            })
          }
          res.cookie('isLoggedIn', true)
          return res.status(201).send(user);
        })
      } else {
        return res.status(401)
          .json({
            ok: false,
            errorMessage: 'Invalid email/password combination.'
          });
      }
    })(req, res, next);
  },
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