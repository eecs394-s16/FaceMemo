angular
  .module('tabs')
  .controller("MyEventsController", ["$scope", "$firebaseArray", function ($scope, $firebaseArray) {
      var ref = new Firebase("https://scorching-fire-12.firebaseio.com/events");
      // download the data into a local object
      $scope.events = $firebaseArray(ref);
  }]);
