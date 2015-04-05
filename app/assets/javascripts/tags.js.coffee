ready = ->
  return unless $("#add_tag_tags_ids").length > 0

  $('.tag-select').select2
    ajax:
      url: '/tags/autocomplete'
      delay: 250
      data: (term) ->
        { q: term }
      results: (data, page) ->
        { results: data }
      cache: true
    minimumInputLength: 1
    multiple: true
    createSearchChoice: (term, data) ->
      if $(data).filter((->
          @text.localeCompare(term) == 0
        )).length == 0
        return {
          id: term
          text: term
        }

$(document).ready ready
$(document).on 'page:load', ready