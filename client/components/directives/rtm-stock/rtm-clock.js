(function(){
  'use strict';

  angular.module('rtmClockModule', [])
  .directive('rtmClock', ['$interval', function($interval){  // Use camelCase here; in HTML use spinal-case for directive
    var o = {};

    o.restrict = 'A';
    o.templateUrl = '/components/directives/rtm-clock/rtm-clock.html';
    o.scope = {frequency:'@'};
    o.link = function(scope, element, attrs){
              function updateTime(){
                scope.date = new Date();
              }
              var id = $interval(updateTime, scope.frequency * 1);

              element.on('$destroy', function(){
                $interval.cancel(id);
              });
              updateTime();
            };

    return o;

  }]);
})();
