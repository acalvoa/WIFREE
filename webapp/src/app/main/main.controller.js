(function() {
  'use strict';

  angular
    .module('webapp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($auth) {
    var vm = this;
    vm.authenticate = function(provider) {
      $auth.authenticate(provider);
    };


  }

  if ($auth.isAuthenticated()) {
    $state.go("facelog");
  }

})();
