"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  // console.log(db);
  return {

    // Saves a tweet to `db`
    // saveTweet: function(newTweet, callback) {
    //   db.collection("tweets").insertOne(newTweet, callback);
    // },

    //if confused, look above for original answer! Playing with promises in a shitty way 😅.

    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet)
        .then(res => callback(null, res));
    },

    // Get all tweets in `db`, sorted by newest first

    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback);
    }
  }
}
