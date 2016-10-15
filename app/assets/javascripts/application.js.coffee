#= require jquery2
#= require jquery_ujs
#= require turbolinks
#= require foundation
#= require select2
#= require_tree .

ready = ->
  # Initialize Foundation.
  $(document).foundation()
  
  # Toggle nav buttons on login click.
  $("#login-nav").on "click", =>
    $("#login-btn img").animate { width:'toggle' }, 150

$(document).ready ready
$(document).on 'page:load', ready
() ->
  $(document).foundation()
