// var moment = require('moment');


$(document).ready(function() {

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

//Posts new Tweet from form on index.html

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
      $('#new-tweet textarea').val("");
      $('#new-tweet .counter').text(140);
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

//Toggles newTweet form from compose button

$('.compose').on('click', function() {
  var $newTweet = $('.new-tweet');
  $newTweet.slideToggle();
  $newTweet.find('textarea').select();
});

loadTweets();

});
