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
    
  # Load video info when link is pasted.
  $("#video-link-go").on "click", =>
    link = $("#link_link").val()
    
    # Get link host.
    if link.indexOf("youtu") != -1
      provider = "youtube"
    else if link.indexOf("vimeo") != -1 
      provider = "vimeo"
    else
      alert("Link must be from YouTube or Vimeo.")
      return
      
    # Get key.
    if provider == "youtube"
      key = link
      start = key.indexOf("v=") + 2
      key = key.substr(start)
      end = key.indexOf("&")
      key = key.substr(0, end) unless end == -1
    else
      key = link
      start = key.indexOf("vimeo.com/") + 10
      key = key.substr(start)
      end = key.indexOf("&")
      key = key.substr(0, end) unless end == -1
    
    # Hit appropriate API to get info.
    if provider == "youtube"
      $.ajax(
        dataType: "jsonp"
        jsonp: "callback"
        url: "http://www.youtube.com/oembed?url=#{link}&format=json"
        success: (data) ->
          console.log data
      )
      
    return false
      
$(document).ready ready
$(document).on 'page:load', ready