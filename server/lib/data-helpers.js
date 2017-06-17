"use strict";

const ObjectID = require("mongodb").ObjectID;
// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // saveTweet: function(newTweet, callback) {
    //   db.collection("tweets").insertOne(newTweet, callback);
    // },

    //look above for original answer!

    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet)
        .then(res => callback(null, res));
    },

    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback);
    },

    incrementLikes: function(id, callback) {
      db.collection("tweets").findOneAndUpdate({"_id" : ObjectID(id)}, { $inc: { "likes" : 1 } });
    }
  }
}
