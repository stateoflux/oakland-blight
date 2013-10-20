var containter = document.querySelector('#container');

var masonry = new Masonry(container, {
  columnWidth: '.grid-sizer',
  itemSelector: '.item',
  gutter: 10
});