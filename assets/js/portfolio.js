document.querySelectorAll('.filters').forEach(function(filters) { filters.hidden = false; });
document.querySelectorAll('[data-year-filter]').forEach(function(button) {
  button.addEventListener('click', function() {
    var year = button.dataset.yearFilter;
    document.querySelectorAll('[data-year-filter]').forEach(function(item) { item.setAttribute('aria-pressed', String(item === button)); });
    document.querySelectorAll('[data-post-year]').forEach(function(post) { post.hidden = year !== 'all' && post.dataset.postYear !== year; });
  });
});
