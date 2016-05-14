var constants = require('../config/constants');

// server is using mongodb for the database hosted on heroku in mongolabs
var mongo = require('mongodb');
var mongoskin = require('mongoskin');

// heroku and dev db
var db = mongoskin.db(process.env.MONGOLAB_URI || 'mongodb://@localhost:27017/varsanity', {safe:true})

// connection to db collection
var collection = db.collection('varsanity', {strict: true});

module.exports = db;