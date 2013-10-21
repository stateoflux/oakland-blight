$(document).ready(function() {
  var masonry;
  var container = document.querySelector('#container');

  imagesLoaded(container, function() {
    masonry = new Masonry(container, {
      columnWidth: '.grid-sizer',
      itemSelector: '.item',
      gutter: 14
    });
  });
});