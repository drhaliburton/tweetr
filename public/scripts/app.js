/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// var moment = require('moment');


$(document).ready(function() {
// $("time.timeago").timeago();

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function createTweetElement(tweets) {

  var tweetContent = tweets.content.text;
  var tweetHandle = tweets.user.handle;
  var tweetUsername = tweets.user.name;
  var tweetAvatar = tweets.user.avatars.regular;
  var tweetCreatedAt = $.timeago(tweets.created_at);

  return `<article class="tweet">
    <header>
      <span class="user">
        <img src="${escape(tweetAvatar)}" /> ${escape(tweetUsername)}
      </span>
      <span class="handle">${escape(tweetHandle)}</span>
    </header>
    <p class="tweet-content">${escape(tweetContent)}</p>
    <footer>
    <div><time>${escape(tweetCreatedAt)}</time><span class="icons"> ▲ ↩︎ ❤︎</span></div>
    </footer>
  </article>`;
}

var $tweets = $('.tweets');

function renderTweets(tweets) {
  $tweets.empty();
  for (var i = 0; i < tweets.length; i++) {
    var $tweet = createTweetElement(tweets[i]);
    $tweets.prepend($tweet);
  }
};

// renderTweets(data);

// event.preventDefault();
// console.log($(this).prev().val());
// debugger;
// var str = $(this).serialize();
// var inputLength = Array.from(str).length;

$('#new-tweet').on('submit', function (event) {
  event.preventDefault();
  var inputLength = ($(this).serialize().length - 5);
  if (inputLength >= 140) {
    error: alert('Tweet Exceeded Length');
  } else {
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $(this).serialize()
    }).done(function () {
      loadTweets();
    });
  }
});

function loadTweets() {
  $.ajax({
    method: 'GET',
    url: '/tweets',
    success: function (tweetData) {
        renderTweets(tweetData)
      }
  });
}

$('.compose').on('click', function() {
  var $newTweet = $('.new-tweet');
  $newTweet.slideToggle();
  $newTweet.find('textarea').select();
});

loadTweets();

});
