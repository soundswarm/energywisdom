var constants = require('../config/constants');

// server is using mongodb for the database hosted on heroku in mongolabs
var mongoskin = require('mongoskin');
var url = 'mongodb://@localhost:27017/varsanity'


// var db = MongoClient.connect(url)
// heroku and dev db
var db = mongoskin.db('mongodb://@localhost:27017/varsanity', {safe:true})
db.createCollection('Users')
module.exports = db;