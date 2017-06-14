$(document).ready(function() {
  $(".new-tweet form textarea").on('keypress', function() {

    var inputValLength = $(this).val().length;
    var maxCount = 140;
    var counter = $(this).parent().find('.counter');
    counter.text(maxCount - inputValLength);

    if (inputValLength > maxCount) {
      counter.css("color", "red");
    }
  });
});
