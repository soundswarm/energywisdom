var constants = require('../config/constants');

// server is using mongodb for the database hosted on heroku in mongolabs
var mongo = require('mongodb');
var mongoskin = require('mongoskin');

// heroku and dev db
var db = mongoskin.db('mongodb://@localhost:27017/varsanity', {safe:true})

module.exports = db;