var morgan = require('morgan'); // used for logging incoming request
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cors = require('cors');
var constants = require('./constants');

module.exports = function(app, express) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cors());

  //error handling
  // app.use(function(err, req, res, next){
  //   if (err.name === 'StatusError') {
  //     res.send(err.status, err.message);
  //   } else {
  //     next(err);
  //   }
  // });


  
  app.use(express.static(__dirname + '/../../reactClient'));
<<<<<<< HEAD
  //webpack is not used on the server because the build happens before the code is pushed to the server
  if(process.env.NODE_ENV !== 'production') {
    // var config = require('../../reactClient/webpack.config.js')
    // var webpack = require('webpack')
    // var webpackDevMiddleware = require('webpack-dev-middleware')
    // var webpackHotMiddleware = require('webpack-hot-middleware')
    // // config.output = {path:'/'} leave commented
    // var compiler = webpack(config);

    // app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
    // app.use(webpackHotMiddleware(compiler))
  }
  
=======

>>>>>>> 6f6ca28e5ebad4d43742fcbf5c4326468d81e48d

  // routes
  var apiRouter = new express.Router();


  // Use application-level middleware for common functionality, including
  // logging, parsing, and session handling.
  // app.use(morgan('dev'));

  app.use(function(req, res, next){
    // do shit
    next()
  })

  app.use(cookieParser());
  // var redisOptions = {
  //   url: constants.REDIS_URL
  // }
  app.use(session({ secret: 'secretkey', resave: true, saveUninitialized: true }))


  // Initialize Passport and restore authentication state, if any, from the
  // session.
  app.use(passport.initialize());
  app.use(passport.session());

  // FIXME: not middleware, put somewhere else
  var apiRouter = new express.Router();
  // divide up routes
  // app.use('/auth', authRouter);
  app.use('/api', apiRouter);
  // require('../auth/routes')(authRouter);

  require('../api/apiRoutes')(apiRouter);

  /////////////////////////////////////change for react and angular

   app.get('*', function(req, res, next) {
     
       res.sendFile(path.resolve(__dirname + '/../../reactClient/index.html'));
   });
   /////////////////////////////////////change for react and angular




  app.use(function(err, req, res, next) {
    // check if browser expects a page
    // or JSO
var env = process.env.NODE_ENV
    console.log('in error handler', err);
    if (err.name === 'StatusError') {
      if (/^prod/.test(env)) {
        res.sendStatus(err.status)
      } else {
        res.status(err.status).send(err.message);
      }
    } else {
      if (/^prod/.test(env)) {
        res.sendStatus(500)
      } else {
        res.status(500).send(err.message)
      }
      // res.status(???).json({ok: false, error: err})
      // next(err);
    }
  });

};