(function(){
  'use strict';
  angular.module('ab-timer')
  .controller('MainCtrl', ['$scope', '$interval', function($scope, $interval){
    var id;

    $scope.min = 0;
    $scope.sec = 0;
    $scope.isRunning = false;
    $scope.isDone = false;

    $scope.changeMin = function(num){
      var min = $scope.min;
      min += parseInt(num);
      min = min < 0 ? 0 : min;
      $scope.min = min;
    };
    $scope.changeSec = function(num){
      var sec = $scope.sec;
      sec += parseInt(num);
      if(sec > 60){
        $scope.min += 1;
        sec -= 60;
      }else if(sec < 0){
        if($scope.min > 0){
          $scope.changeMin(-1);
          sec = 60;
        }
      }
      sec = sec < 0 ? 0 : sec;
      $scope.sec = sec;
    };

    $scope.cancel = function(){
      $scope.isRunning = false;
      $scope.isDone = false;
      $scope.min = 0;
      $scope.sec = 0;
      $interval.cancel(id);
    };

    $scope.done = function(){
      navigator.vibrate(3000);
      $scope.isDone = true;
    };

    $scope.start = function(){
      if($scope.min === 0 && $scope.sec === 0){return;}
      $scope.isRunning = true;
      id = $interval(function(){
        var sec = $scope.sec;
        sec -= 1;
        if(sec < 0){
          $scope.min -= 1;
          sec = 60;
        }
        $scope.sec = sec;
        if($scope.min === 0 && $scope.sec === 0){
          $interval.cancel(id);
          $scope.done();
        }
      }, 1000);
    };

  }]);
})();
