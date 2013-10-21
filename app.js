"use strict";

$(document).ready(function() {
  var masonry;
  var container = document.querySelector("#container");
  var url_comps = [
    "http://seeclickfix.com/api/issues.json",
    "?at=Oakland,+CA",
    "&zoom=10",
    "&start=24",
    "&end=0",
    "&page=1",
    "&num_results=10",
    "&search=illegal+dumping",
    "&callback=?"
  ];

  $.getJSON(url_comps.join(""), function(data) {
    console.log(data);
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