'use strict';

(function(module) {
  var articleController = {};

  Article.createTable();

  articleController.index = function(ctx, next) {
    if(ctx.articles.length) {
      articleView.index(ctx.articles);
    } else{
      page('/');
    }
  };

  // COMMENTed: What does this method do?  What is it's execution path?
  // This method redirects the page to load the remaining portion of the article upon clicking on read-on. Its execution path would be upon click of read on it would look through all instances of the artciles, locate the article ID you selected, findwhere the article ID is the same as the selected article and then calls the next function articleControll.index which passes the article content into the articleView.index as an arguement, if an article ID was not found it will reload the home page.
  articleController.loadById = function(ctx, next) {
    console.log(ctx);
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };
    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENTed: What does this method do?  What is it's execution path?
  //based on the seleted option from the navigation menu it finds all articles with the same author value and displays those articles. Upon selection loadByAuthor is invoked and then it runs articleController.index when renders the correctly selected articles to the view.
  articleController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere(
      'author', ctx.params.authorName.replace('+', ' '), authorData
    );
  };

  // COMMENTed: What does this method do?  What is it's execution path?
    //based on the seleted option from the navigation menu it finds all articles with the same category value and displays those articles. Upon selection loadByCategory is invoked and then it runs articleController.index when renders the correctly selected articles to the view.
  articleController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //upon page load .loadAll sets the ctx.articles to be the same as the already populated arry of all object instances. It passes the context onto the next function where it calls the .index function which contains the articleView.index function; rendering all the articles to the view.
  articleController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.allArticles;
      next();
    };

    if (Article.allArticles.length) {
      ctx.articles = Article.allArticles;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };

  module.articleController = articleController;
})(window);
