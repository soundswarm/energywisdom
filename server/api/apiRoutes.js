var Users = require('../controllers/Users')
// var Auth = require('../controllers/Auth')
var passport = require('passport');

module.exports = function(app) {
  // Auth routes
  // app.post('/signUp', Auth.signUp);
  // app.post('/signIn', Auth.signIn);
  // app.get('/signOut', Auth.signOut);

  // app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'} ));
  // app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  //       failureRedirect : '/subscriber/signup'
  //   }), function(req, res) {
  //     var user = req.user;
  //     res.cookie('isLoggedIn', true);
  //     res.redirect('/subscriber/facebookCallback');
      
  //   }
  // )
  app.get('/addUser', Users.addUser)



  // routes for testing
  // app.get('/createTables', Database.createTables);
  // app.get('/loadData', Database.loadData);
  // app.get('/dropTables', Database.dropTables);
};
