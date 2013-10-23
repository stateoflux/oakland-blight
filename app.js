"use strict";

$(document).ready(function() {
  var masonry;
  var container = document.querySelector("#container");
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

  var issue_url = function(id) {
    var url = "http://seeclickfix.com/api/issues/";

    return url + id + ".json?callback=?";
  };

  // compile issue template
  var issueTemplate = Handlebars.compile($('#issue-template').html());

  // var issues = [];

  $.getJSON(list_url.join(""), function(data) {
    data.forEach(function(issue) {
      $.getJSON(issue_url(issue.issue_id), function(data) {
        // issues.push(data);
        // how should I process each issue object?
        // for now, all I want is the url to the issue's photo
        // once i get my urls, how should i proceed?
        // i suppose I should add list elements programmatically
        // at each iteration to a document fragment.  at completion
        // of the loop, I will then insert the fragment into the
        // main document.  This should kick of the image download
        // process.  imagesLoaded will then tell masonry to layout.
        // I should probably use handlerbars for the photo template.
        console.log(data[0]);
        $('#container').append(issueTemplate({
          issue_photo_url: data[0].public_filename
        }));
      });
    });
  });


  /* Init Masonry once the images are loaded
   * ======================================================================= */

  imagesLoaded(container, function() {
    masonry = new Masonry(container, {
      columnWidth: ".grid-sizer",
      itemSelector: ".item",
      gutter: 14
    });
  });
});