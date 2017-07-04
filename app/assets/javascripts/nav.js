import $ from 'jquery';

$(document).ready(() => {
  $('.nav-login-btn').on('click', () => {
    $('.nav-dropdown').toggleClass('hidden');
  });

  $(document).on('click', (e) => {
    if($(e.target).parents('.dropdown').length !== 0) {
      return;
    }

    if($('.nav-dropdown').is('hidden')) {
      return;
    }

    $('.nav-dropdown').addClass('hidden');
  });
});
