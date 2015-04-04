ready = ->
  return unless $("#new_video").length > 0

  # Hide form until link is confirmed.
  $("#new_video").hide()
  $(".video-aff-debaters").hide()
  $(".video-neg-debaters").hide()
  
  # Bind autocompletes.
  createSearchChoice = (term, data) ->
    if $(data).filter((->
        @text.localeCompare(term) == 0
      )).length == 0
      return {
        id: term
        text: term
      }

  $('.school-select').select2
    ajax:
      url: '/schools/autocomplete'
      delay: 250
      data: (term) ->
        { q: term }
      results: (data, page) ->
        { results: data }
      cache: true
    createSearchChoice: createSearchChoice
    minimumInputLength: 1

  $('.aff-debater-select').select2
    ajax:
      url: '/debaters/autocomplete'
      delay: 250
      data: (term) ->
        school = $("#video_aff_school").val()
        if isNaN(school)
          { q: false }
        else
          { school: school, q: term }
      results: (data, page) ->
        { results: data }
      cache: true
    createSearchChoice: createSearchChoice
    minimumInputLength: 1

  $('.neg-debater-select').select2
    ajax:
      url: '/debaters/autocomplete'
      delay: 250
      data: (term) ->
        school = $("#video_neg_school").val()
        if isNaN(school)
          { q: false }
        else
          { school: school, q: term }
      results: (data, page) ->
        { results: data }
      cache: true
    createSearchChoice: createSearchChoice
    minimumInputLength: 1

  $('.tag-select').select2
    ajax:
      url: '/tags/autocomplete'
      delay: 250
      data: (term) ->
        { q: term }
      results: (data, page) ->
        { results: data }
      cache: true
    createSearchChoice: createSearchChoice
    minimumInputLength: 1
    multiple: true

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
        $("#video_provider").val(info.provider)
        $("#video_thumbnail").val(info.thumbnail)

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

  # Show debater dropdowns when schools selected.
  $("#video_aff_school").on "change", ->
    $(".video-aff-debaters").show()

  $("#video_neg_school").on "change", ->
    $(".video-neg-debaters").show()

$(document).ready ready
$(document).on 'page:load', ready