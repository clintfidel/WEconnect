$(() => {
  $('#my-info').click(function (e) {
    $('.bus-info-details').delay(100).fadeIn(100);
    $('#my-reviews').fadeOut(100);
    $('.bus-review-details').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
  });
  $('#my-reviews').click(function (e) {
    $('.bus-review-details').delay(100).fadeIn(100);
    $('#my-info').fadeOut(100);
    $('.bus-info-details').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
  });
});