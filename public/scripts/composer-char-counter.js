//Displays the input length in the new-tweet form less the max character count

$(document).ready(function() {
  $(".new-tweet form textarea").on('input', function() {
    var inputValLength = $(this).val().length;
    var maxCount = 140;
    var counter = $(this).parent().find('.counter');
    counter.text(maxCount - inputValLength);

    if (inputValLength > maxCount) {
      counter.css("color", "red");
    } else {
      counter.css("color", "black");
    }
  });
});
