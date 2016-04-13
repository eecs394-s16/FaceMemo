angular
  .module('tabs')
  .controller("MyEventsController", ["$scope", "$firebaseArray", function ($scope, $firebaseArray) {
      var ref = new Firebase("https://scorching-fire-12.firebaseio.com/events");
      // download the data into a local object
      $scope.events = $firebaseArray(ref);

      //pass data into the eventInformation view specifying which event's information to show
      $scope.clickedEvent = function(e) {
      	// var list_of_attendees = e.attendees;
        window.localStorage.setItem("clickedEvent",JSON.stringify(e));
        // window.localStorage.setItem("list_of_attendees", JSON.stringify(list_of_attendees));
      }
  }]);
