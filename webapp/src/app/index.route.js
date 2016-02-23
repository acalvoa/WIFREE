(function() {
  'use strict';

  angular
    .module('webapp')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });

    $stateProvider
      .state('facelog', {
        url: '/facelog',
        templateUrl: 'app/facelog/facelog.html',
        controller: 'FaceLogController',
        controllerAs: 'show'
      });


    $urlRouterProvider.otherwise('/');
  }

})();
