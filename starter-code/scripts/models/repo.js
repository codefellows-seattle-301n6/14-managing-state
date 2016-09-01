(function(module) {
  var reposObj = {};

  reposObj.all = [];

  reposObj.requestRepos = function(callback) {
    $.get('/github/users/codefellows-seattle-301d9/repos' +
          '?per_page=5' +
          '&sort=updated')
    .done(function(data, message, xhr) {
      reposObj.all = data;
    })
    .done(callback);
  };

  reposObj.with = function(attr) {
    return reposObj.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.reposObj = reposObj;
})(window);
