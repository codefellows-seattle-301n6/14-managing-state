'use strict';

(function(module) {
  var repoView = {};

  var ui = function() {
    var $about = $('#about');

    $about.find('ul').empty();
    $about.show().siblings().hide();
  };

  var render = function(repo) {
    return $('<li>')
      .html('<a href="' + repo.html_url + '">' + repo.full_name + '</a>');
  };

  repoView.index = function() {
    ui();

    $('#about ul').append(
      reposObj.with('forks_count').map(render)
    );
  };

  module.repoView = repoView;
})(window);
