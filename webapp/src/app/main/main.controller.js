(function() {
  'use strict';

  angular
    .module('webapp')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($auth, $state) {
    var vm = this;
    vm.authenticate = function(provider) {
      $auth.authenticate(provider);
      $state.go("facelog");
    };




  }

})();
