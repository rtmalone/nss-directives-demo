(function(){
  'use strict';

  angular.module('rtmStockModule', [])
  .factory('StockApi', ['$http', function($http){
    function quote(symbol){
      return $http.jsonp('http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol='+symbol+'&callback=JSON_CALLBACK');
    }

    return {quote:quote};
  }])
  .directive('rtmStock', ['$interval', function($interval){  // Use camelCase here; in HTML use spinal-case for directive
    var o = {};

    o.restrict = 'A';
    o.templateUrl = '/components/directives/rtm-stock/rtm-stock.html';
    o.scope = {symbol:'@'};
    o.link = function(scope, element, attrs){
      element.on('$destroy', function(){
        $interval.cancel(scope.id);
      });
    };

    o.controller = ['$scope', 'StockApi', function($scope, StockApi){
      function getQuote(){
        StockApi.quote($scope.symbol).then(function(response){
          $scope.quote = response.data.LastPrice;
        });
      }
      $scope.id = $interval(getQuote, 10000);
      getQuote();
    }];

    return o;

  }]);
})();
