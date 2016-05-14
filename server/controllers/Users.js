var db = require('../db/schema')
var Users = db.collection('Users', {strict: true});

module.exports = {
  addUser: function(req, res) {
    Users.insert({
      userId: 1,
      name:'sean'
    })
    res.status(200).send('asdf')
  }
}