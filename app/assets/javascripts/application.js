import $ from 'jquery';

let ready = function() {
  // Toggle nav buttons on login click.
  return $("#login-nav").on("click", () => {
    return $("#login-btn img").animate({ width: "toggle" }, 150);
  });
};

$(document).ready(ready);
$(document).on("page:load", ready);
