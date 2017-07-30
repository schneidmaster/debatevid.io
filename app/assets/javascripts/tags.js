import $ from 'jquery';

$(document).ready(() => {
  if (!($('#add_tag_tags_ids').length > 0)) {
    return;
  }

  return $('.tag-select').select2({
    ajax: {
      url: '/tags/autocomplete',
      delay: 250,
      data(term) {
        return { q: term };
      },
      results(data, page) {
        return { results: data };
      },
      cache: true,
    },
    minimumInputLength: 1,
    multiple: true,
    createSearchChoice(term, data) {
      if (
        $(data).filter(function() {
          return this.text.localeCompare(term) === 0;
        }).length === 0
      ) {
        return {
          id: term,
          text: term,
        };
      }
    },
  });
});
