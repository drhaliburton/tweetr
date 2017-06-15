"use strict";

const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // db.collection("tweets").find().toArray((err, results) => {
  //   if (err) throw err;
  //
  //   console.log("results array: ", results);
  // });


  function getTweets(callback) {
    db.collection("tweets").find().toArray(callback);
  }

  getTweets((err, results) => {
    if (err) throw err;

    console.log("Results Data:")
    var resultsCounter = 0;
    for (var data of results) {
      resultsCounter += 1;
      console.log("Result ", resultsCounter);
      console.log("  ");
      console.log(data);
      console.log("  ");
    }
  });



//// Method 1

  // db.collection("tweets").find({}, (err, results) => {
  //   if (err) throw err;
  //
  //   results.toArray((err, resultsArray) => {
  //     if (err) throw err;
  //
  //     console.log("results.toArray:", resultsArray);
  //   });

    // console.log("for each item yielded by the cursor");
    // results.each((err, item) => console.log(" ", item));

    db.close();
  // });
});
