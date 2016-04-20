/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('webapp')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant("config", {
        "client_id": {
          "facebook": "410915335781368"}
  })

  ;

})();
