"use strict";

$(document).ready(function() {
  var $container = $("#container");
  var list_url = [
    "http://seeclickfix.com/api/issues.json",
    "?at=Oakland,+CA",
    "&zoom=10",
    "&start=48",
    "&end=0",
    "&page=1",
    "&num_results=10",
    "&search=illegal+dumping",
    "&callback=?"
  ];

  // compile issue template
  var issueTemplate = Handlebars.compile($('#issue-template').html());

  var list_fragment = '<li class="grid-sizer"></li>';
  var issue_url = function(id) {
    var url = "http://seeclickfix.com/api/issues/";

    return url + id + ".json?callback=?";
  };

  var defs = [];

  // TODO: add error callbacks to the AJAX calls

  $.getJSON(list_url.join(""))
    .done(function (issues) {
      console.log(issues);
      issues.forEach(function(issue) {
        defs.push($.getJSON(issue_url(issue.issue_id))
          .done(function(issue_detail) {
            console.log("adding issue to frag: " + issue_detail[0].public_filename);
            list_fragment += (issueTemplate({
              issue_photo_url: issue_detail[0].public_filename
            })); 
          }));
      });
      $.when.apply(null, defs)
        .done(doLayout);
    });

  function doLayout() {
    console.log("about to append fragment");
    $container.append($(list_fragment));
    $container.imagesLoaded()
      .done(function() {
        console.log("about to start masonry layout");
        $container.masonry({
          columnWidth: ".grid-sizer",
          itemSelector: ".item",
          gutter: 14
        });
      })
      .fail(function() {
        console.log("an image did not load?");
      })
  }
});

