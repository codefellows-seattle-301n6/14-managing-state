'use strict';

articleView.initNewArticlePage = function() {
  $('#articles').show().siblings().hide();

  $('#export-field').hide();
  $('#article-json').on('focus', function(){
    this.select();
  });

  $('#new-form').on('change', 'input, textarea', articleView.create);
};

articleView.create = function() {
  var formArticle;
  $('#articles').empty();

  // Instantiate an article based on what's in the form fields:
  formArticle = new Article({
    title: $('#article-title').val(),
    author: $('#article-author').val(),
    authorUrl: $('#article-author-url').val(),
    category: $('#article-category').val(),
    body: $('#article-body').val(),
    publishedOn: $('#article-published:checked').length ? new Date() : null
  });

  $('#articles').append(render(formArticle));

  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });

  // Export the new article as JSON,
  //  so it's ready to copy/paste into blogArticles.js:
  $('#export-field').show();
  $('#article-json').val(JSON.stringify(article) + ',');
};
