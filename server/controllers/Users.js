var db = require('../db/schema')

var Users = db.collection('Users', {strict: false});

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
  addFacebookUser: function(user) {
    return Users.insertAsync(user)
    .then(function(user) {
      return user
    })
  },
  addUtilityApiBillData: function(req, res) {
    var data = req.body;
    console.log(data);
    Users.updateAsync({userId: 8}, {$set: {utilityApiBill: data} })
    .then(function(user) {
      res.status(201).send('succes')
    })

  }

}