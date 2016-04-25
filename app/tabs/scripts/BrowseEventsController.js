angular
  .module('tabs')
  .controller("BrowseEventsController", ["$scope", "$firebaseArray", "supersonic", function ($scope, $firebaseArray, supersonic) {
      var ref = new Firebase("https://scorching-fire-12.firebaseio.com/events");
      //download the data into a local object
      $scope.events = $firebaseArray(ref);

      $scope.events.$loaded().then(function() {
        for (var i = 0; i < $scope.events.length; i++) {
          var date = new Date($scope.events[i].date);
          $scope.events[i].date = date;
        }
      });

      //pass data into the eventInformation view specifying which event's information to show
      $scope.clickedEvent = function(e) {
      	// var message = {
      	// 	attendees: e.attendees,
      	// 	date: e.date,
      	// 	image: e.image,
      	// 	location: e.location,
      	// 	name: e.name,
      	// 	time: e.time,
       //    description: e.description
      	// }
        // $scope.event = message;
        // window.localStorage.setItem("clicked_event", JSON.stringify(message));
        window.localStorage.setItem("clicked_event", angular.toJson(e));
      }
  }]);
