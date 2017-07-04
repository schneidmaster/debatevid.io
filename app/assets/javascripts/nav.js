import $ from 'jquery';

$(document).ready(() => {
  $('.nav-login-btn').on('click', () => {
    $('.nav-dropdown').toggleClass('hidden');
  });
});
