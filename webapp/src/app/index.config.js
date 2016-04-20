(function() {
  'use strict';

  angular
    .module('webapp')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $authProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    $authProvider.facebook({
      clientId: '410915335781368'
    });

    // Optional: For client-side use (Implicit Grant), set responseType to 'token

  }

})();
