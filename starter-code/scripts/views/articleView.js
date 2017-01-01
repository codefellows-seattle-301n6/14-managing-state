'use strict';

(function(module) {

  var articleView = {};

  var render = function(article) {
    var template = Handlebars.compile($('#article-template').text());

    article.daysAgo =
    parseInt((new Date() - new Date(article.publishedOn))/60/60/24/1000);
    article.publishStatus =
    article.publishedOn ? 'published ' +
    article.daysAgo + ' days ago' : '(draft)';
    article.body = marked(article.body);

    return template(article);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // This method maps over all the article instances. Using the handlebars template, it returns two separate arrays and populates the authors and category filters.
  articleView.populateFilters = function() {
    var options;
    var template = Handlebars.compile($('#option-template').text());
    options = Article.allAuthors()
    .map(function(author) {
      return template({val: author});
    });
    $('#author-filter').append(options);

    Article.allCategories(function(rows) {
      $('#category-filter').append(
        rows.map(function(row) {
          return template({val: row.category});
        })
      );
    });
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // This method has an event listener on the filters dropdown for both author and category. Once something is selected, it uses the value captured by the event to fire off the functionality to replace the element with that id.
  articleView.handleFilters = function() {
    $('#filters').one('change', 'select', function() {
      var resource = this.id.replace('-filter', '');
      $(this).parent().siblings().children().val('');
      page('/' + resource + '/' +
      // Replace any/all whitespace with a '+' sign
      $(this).val().replace(/\W+/g, '+')
    );
    });
  };
/* articleView.handleAuthorFilter = function() {
$('#author-filter').on('change', function() {
if ($(this).val()) {
$('article').hide();
$('article[data-author="' + $(this).val() + '"]').fadeIn();
} else {
$('article').fadeIn();
$('article.template').hide();
}
$('#category-filter').val('');
});
};

articleView.handleCategoryFilter = function() {
$('#category-filter').on('change', function() {
if ($(this).val()) {
$('article').hide();
$('article[data-category="' + $(this).val() + '"]').fadeIn();
} else {
$('article').fadeIn();
`        $('article.template').hide();
}
$('#author-filter').val('');
});
};

DONE: Remove the setTeasers method,
and replace with a plain ole link in the article template.
articleView.setTeasers = function() {
$('.article-body *:nth-of-type(n+2)').hide();

$('#articles').on('click', 'a.read-on', function(e) {
e.preventDefault();
$(this).parent().find('*').fadeIn();
$(this).hide();
});
}; */

// COMMENT: What does this method do?  What is it's execution path?
// This method is mapping over the all articles array to render it all to the home page. At the same time, there are other methods being called that filters to hide any duplicates from being shown.
  articleView.index = function(articles) {
    $('#articles').show().siblings().hide();

    $('#articles article').remove();
    articles.forEach(function(a) {
      $('#articles').append(render(a));
    });

    articleView.populateFilters();
    articleView.handleFilters();

  // DONE: Replace setTeasers with just the truncation logic, if needed:
    if ($('#articles article').length > 1) {
      $('.article-body *:nth-of-type(n+2)').hide();
    }
  };

  module.articleView = articleView;
})(window);
