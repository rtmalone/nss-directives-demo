(function(){
  'use strict';

  angular.module('rtmGreetingModule', [])
  .directive('rtmGreeting', [function(){  // Use camelCase here; in HTML use spinal-case for directive
    var o = {};

    o.restrict = 'A';
    o.templateUrl = '/components/directives/rtm-greeting/rtm-greeting.html';
    o.scope = {name:'@', age:'@'};

    return o;

  }]);
})();
