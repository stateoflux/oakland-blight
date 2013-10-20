var containter = document.querySelector('#container');

var masonry = new Masonry(container, {
  columnWidth: 60,
  itemSelector: '.item',
  gutter: 10
});