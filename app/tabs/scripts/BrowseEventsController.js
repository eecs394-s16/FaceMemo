angular
  .module('tabs')
  .controller("BrowseEventsController", ["$scope", "$firebaseArray", "eventFactory", function ($scope, $firebaseArray, eventFactory) {
      var ref = new Firebase("https://scorching-fire-12.firebaseio.com/events");
      //download the data into a local object
      $scope.events = $firebaseArray(ref);

      $scope.event = eventFactory.getEvent();

      //pass data into the eventInformation view specifying which event's information to show
      $scope.saveClickedEvent = function(e) {
      	var clickedEvent = {
      		attendees: e.attendees,
      		date: e.date, 
      		image: e.image,
      		location: e.location,
      		name: e.name,
      		time: e.time,
      	}
      	eventFactory.setEvent(clickedEvent);
      	$scope.event = eventFactory.getEvent();
      }
  }]);
