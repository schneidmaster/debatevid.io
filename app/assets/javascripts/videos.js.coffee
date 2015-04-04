ready = ->
  return unless $("#new_video").length > 0

  # Hide form until link is confirmed.
  $("#new_video").hide()

  # Continue when go button clicked
  $("#video-link-go").on "click", (event) ->
    event.preventDefault()

    link = $("#video_link_link").val()
    $.getJSON "/videos/info/?link=#{link}", (info) ->
      if info.invalid
        alert "Video link invalid; double-check it and try again."
      else
        # Add key to the list.
        keys = $("#video_key").val().split(",")
        if keys.indexOf(info.key) != -1
          alert "That segment has already been added!"
          return
        else
          keys.push info.key
        $("#video_key").val(keys.join(","))

        # Add the video preview.
        $(".end").removeClass "end"
        new_html =  """
                    <div class="large-2 columns end">
                      <strong>#{info.title}</strong>
                      <img src="#{info.thumbnail}" />
                    </div>
                    """
        $("#video-preview").append new_html
        $("#video-link-go").val("Add Segment")

        # Clear the input.
        $("#video_link_link").val("")

        # Show the metadata.
        $("#new_video").show() unless $("#new_video").is(":visible")

$(document).ready ready
$(document).on 'page:load', ready