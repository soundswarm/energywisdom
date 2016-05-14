var db = require('../db/schema')
var constants = require('../config/constants');
var Users = db.collection('Users', {strict: false});
var UtilityApi = require('../helpers/utilityApi');

module.exports = {
  addUser: function(req, res) {
    Users.insertAsync({
      userId: 8,
      name:'sean'
    })
    .then(function(user) {
      console.log(user);
    })

    res.status(200).send('asdf')
  },
  getUser(userId) {
    return Users.findAsync({userId: userId})
    .then(function(user) {
      console.log('user', user);
    })
  },
  addFacebookUser: function(fbUser) {
    // console.log('fbuser to add',user.id);
    var user = {
      userId: fbUser.id,
    }
  // THIS NEEDS TO BE FIXED**********************************
    console.log(Users.findAsync(user))
    return Users.insertAsync(user)
    .then(function(user) {
      console.log('useradded', user.ops[0]);
      return user.ops[0]
    })

  },
  addUtilityApiBillData: function(req, res) {
    var data = req.body;
    console.log(data);
    Users.updateAsync({userId: '10156448709320261'}, {$set: {utilityApiBills: data} })
    .then(function(user) {
      res.status(201).send('succes')
    })
  },
  addUtilityApiIntervalData: function(req, res) {
    var data = req.body;
    console.log('putting in intervals');
    Users.updateAsync({userId: '10156448709320261'}, {$set: {utilityApiIntervals: data} })
    .then(function(user) {
      res.status(201).send('succes')
    })
  },
  addUtilityApi: function(req, res) {
    console.log('inuapi...', req.user);

    // pass the userId to identify unique user
    res.redirect(constants.UTILITYAPI_PORTAL+'?state='+req.user.userId);
  },
  // after signin upai redirects to spicified endpoint
  utilityApiCallback: function(req, res) {
    var context = this;
    // use the referral to get an unique account
    // redirect to we're getting data view
    var referral = req.query.referral;
    var state = req.query.state;
    var userId = state;
    console.log('referral, stsate', referral, userId);
    return UtilityApi.getAccounts(referral)
    .then(function(accounts) {
      return UtilityApi.getAccountServices(accounts)
      .then(function(services) {
        var service = services[0]
        return UtilityApi.activateService(service)
        .then(function() {
          console.log("res.redirect('/subscriber/billDataCallback');");
          res.redirect('/');
          //fix
          // return context.getUser(userId)
          ;
          // return Users.find({userId: userId}).toArrayAsync()
          // .then(function(user) {
          //   return UtilityApi.pollForCompletedActivation(service, user[0]);
          // })
        })
      })
    });
  }
}