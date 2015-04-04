ready = ->
  return unless $("#search-terms").length > 0
  
$(document).ready ready
$(document).on 'page:load', ready