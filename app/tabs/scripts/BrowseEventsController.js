angular
  .module('tabs')
  .controller("BrowseEventsController", ["$scope", "$firebaseArray", "supersonic", function ($scope, $firebaseArray, supersonic) {
      var ref = new Firebase("https://scorching-fire-12.firebaseio.com/events");
      //download the data into a local object
      $scope.events = $firebaseArray(ref);

      //pass data into the eventInformation view specifying which event's information to show
      $scope.saveClickedEvent = function(e) {
      	var message = {
      		attendees: e.attendees,
      		date: e.date, 
      		image: e.image,
      		location: e.location,
      		name: e.name,
      		time: e.time,
          description: e.description
      	}
        $scope.event = message;
        window.localStorage.setItem("clicked_event", JSON.stringify(message));
      }
  }]);
