angular
  .module('tabs')
  .controller("AttendeesController", ["$scope", "$firebaseArray", function ($scope, $firebaseArray) {
      var ref = new Firebase("https://scorching-fire-12.firebaseio.com/users");

      $scope.attendees = $firebaseArray(ref);
  }]);
