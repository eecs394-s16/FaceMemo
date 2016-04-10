angular
  .module('tabs')
  .controller("EventInformationController", ["$scope", "$firebaseArray", "supersonic", function ($scope, $firebaseArray, supersonic) {
  		var ref = new Firebase("https://scorching-fire-12.firebaseio.com/users");
  		//retrieves the clicked_event on view load
  		supersonic.ui.views.current.whenVisible(function() {
		    var clicked_event = window.localStorage.getItem("clicked_event");
		    $scope.event = JSON.parse(clicked_event);

		    // var users = $firebaseArray(ref);
		    //still need to iterate through all users and find list of attendees with matching ids
		});
  }]);
