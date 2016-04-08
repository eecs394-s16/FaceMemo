angular
  .module('tabs')
  .controller("EventInformationController", ["$scope", "$firebaseArray", "eventFactory", function ($scope, $firebaseArray, eventFactory) {
  		$scope.event = eventFactory.getEvent();

  		$scope.tester = function() {
  			$scope.test1 = eventFactory.currentEvent;
  		}
  		//for some reason, factory variable is not being shared between two controllers
  }]);
