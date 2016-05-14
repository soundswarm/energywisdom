var db = require('../db/schema')

var Users = db.collection('Users', {strict: false});

module.exports = {
  addUser: function(req, res) {
    Users.insert({
      userId: 4,
      name:'sean'
    })

    res.status(200).send('asdf')
  },
  insertUser: function(user) {
    return Users.insert({
      userId: 2,
      name:'sean'
    })

  }
}