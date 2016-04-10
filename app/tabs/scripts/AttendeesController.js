angular
  .module('tabs')
  .controller("AttendeesController", ["$scope", "$firebaseArray", function ($scope, $firebaseArray) {
  	  var ref = new Firebase("https://scorching-fire-12.firebaseio.com/users");
      // download the data into a local object
      $scope.users = $firebaseArray(ref);
      $scope.attendees = [];
      //when users gets fetched from firebase, this function runs
      $scope.users.$loaded().then(function(list_of_users) {
      	var attendees = window.localStorage.getItem("list_of_attendees");
		var list_of_attendees = JSON.parse(attendees);
		//for each attendee, fetch his record from firebase and push it into $scope.attendees
      	for (var i = 0; i < list_of_attendees.length; i++)
		{
			var user_id = list_of_attendees[i].id;
			var rec = list_of_users.$getRecord(user_id);
			$scope.attendees.push(rec);
		}
	  })

      //keeps track of which attendee the user clicks
      $scope.clickedAttendee = function(attendee) {
        window.localStorage.setItem("clicked_attendee", JSON.stringify(attendee));
        $scope.test = attendee;
      }
  }]);
