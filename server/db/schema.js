var constants = require('../config/constants');
var Promise = require("bluebird");

// server is using mongodb for the database hosted on heroku in mongolabs
var mongoskin = require('mongoskin');
Object.keys(mongoskin).forEach(function(key) {
  var value = mongoskin[key];
  if (typeof value === "function") {
    Promise.promisifyAll(value);
    Promise.promisifyAll(value.prototype);
  }
});
Promise.promisifyAll(mongoskin);

var url = 'mongodb://@localhost:27017/varsanity'


// var db = MongoClient.connect(url)
// heroku and dev db
var db = mongoskin.db('mongodb://@localhost:27017/varsanity', {safe:true})
db.createCollection('Users')
module.exports = db;