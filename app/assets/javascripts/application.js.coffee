#= require jquery/dist/jquery
#= require jquery-ujs/src/rails
#= require turbolinks/lib/assets/javascripts/turbolinks
#= require foundation/js/foundation
#= require_tree .

ready = ->
  # Initialize Foundation.
  $(document).foundation()
  
  # Toggle nav buttons on login click.
  $("#login-nav").on "click", =>
    $("#login-btn img").animate { width:'toggle' }, 150

$(document).ready ready
$(document).on 'page:load', ready