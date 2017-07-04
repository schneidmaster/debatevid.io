import $ from 'jquery';

let ready = function() {
  if (!($("#search-terms").length > 0)) {
    return;
  }

  // Bind autocompletes
  $(".tournament-select").select2({
    ajax: {
      url: "/tournaments/autocomplete",
      delay: 250,
      data(term) {
        return { q: term };
      },
      results(data, page) {
        return { results: data };
      },
      cache: true
    },
    minimumInputLength: 1
  });

  $(".school-select").select2({
    ajax: {
      url: "/schools/autocomplete",
      delay: 250,
      data(term) {
        return { q: term };
      },
      results(data, page) {
        return { results: data };
      },
      cache: true
    },
    minimumInputLength: 1
  });

  $(".team-select").select2({
    ajax: {
      url: "/teams/autocomplete",
      delay: 250,
      data(term) {
        return { q: term };
      },
      results(data, page) {
        return { results: data };
      },
      cache: true
    },
    minimumInputLength: 1
  });

  $(".debater-select").select2({
    ajax: {
      url: "/debaters/autocomplete",
      delay: 250,
      data(term) {
        return { q: term };
      },
      results(data, page) {
        return { results: data };
      },
      cache: true
    },
    minimumInputLength: 1
  });

  $(".tag-select").select2({
    ajax: {
      url: "/tags/autocomplete",
      delay: 250,
      data(term) {
        return { q: term };
      },
      results(data, page) {
        return { results: data };
      },
      cache: true
    },
    minimumInputLength: 1
  });

  $("#search-go").on("click", function(event) {
    event.preventDefault();

    let params = {};

    if ($("#search_debate_level").val() !== "") {
      params["debate_level"] = $("#search_debate_level").val();
    }

    if ($("#search_debate_type").val() !== "") {
      params["debate_type"] = $("#search_debate_type").val();
    }

    if ($("#search_year").val() !== "") {
      params["year"] = $("#search_year").val();
    }

    if ($("#search_tournament").val() !== "") {
      params["tournament"] = $("#search_tournament").val();
    }

    if ($("#search_school").val() !== "") {
      params["school"] = $("#search_school").val();
    }

    if ($("#search_team").val() !== "") {
      params["team"] = $("#search_team").val();
    }

    if ($("#search_debater").val() !== "") {
      params["debater"] = $("#search_debater").val();
    }

    if ($("#search_tag").val() !== "") {
      params["tag"] = $("#search_tag").val();
    }

    return $.get("/videos/search", { data: params }, function(data) {
      if (data === '<div class="row">\n</div>') {
        return $("#search-results").html(
          "No search results; try broadening your terms."
        );
      } else {
        return $("#search-results").html(data);
      }
    });
  });

  return $("#search-clear").on("click", function(event) {
    event.preventDefault();

    $("#search_debate_level").val("");
    $("#search_debate_type").val("");
    $("#search_year").val("");
    $("#search_tournament").select2("data", null);
    $("#search_school").select2("data", null);
    $("#search_team").select2("data", null);
    $("#search_debater").select2("data", null);
    $("#search_tag").select2("data", null);

    return $("#search-results").html("");
  });
};

$(document).ready(ready);
$(document).on("page:load", ready);
