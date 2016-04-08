angular
  .module('tabs')
  .controller("AttendeesController", ["$scope", "$firebaseArray", function ($scope, $firebaseArray) {
      var ref = new Firebase("https://scorching-fire-12.firebaseio.com/users");

      $scope.attendees = $firebaseArray(ref);

      $scope.clickedAttendee = function(attendee) {
        window.localStorage.setItem("clicked_attendee", JSON.stringify(attendee));
        $scope.test = attendee;
      }
  }]);
