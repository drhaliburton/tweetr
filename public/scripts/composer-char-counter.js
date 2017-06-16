//Displays the characters remaining for a valid tweet

// $(document).ready(function() {
//   $(".new-tweet form textarea").on('input', function() {
//     var inputValLength = $(this).val().length;
//     var maxCount = 140;
//     var counter = $(this).parent().find('.counter');
//     counter.text(maxCount - inputValLength);
//
//     if (inputValLength > maxCount) {
//       counter.css("color", "red");
//     } else {
//       counter.css("color", "black");
//     }
//   });
// });


$(document).ready(function(){
  const limit = 140;

  $('.new-tweet form textarea').on('input', function(){
    var typed = ($(this).val().length);
    var counter = $(this).parent().find('.counter');
    var remainingChars = limit - typed;
    if (remainingChars < 0) {
        counter.css("color", "red");
        } else {
        counter.css("color", "black");
        }
    counter.text(remainingChars);
  });
});
