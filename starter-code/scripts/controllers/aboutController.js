'use strict';

(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    reposObj.requestRepos(repoView.index);
  };

  module.aboutController = aboutController;
})(window);
