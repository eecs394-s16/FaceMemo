angular
	.module('tabs')
	.controller("MyEventsController", function ($scope, $firebaseArray, auth, store, supersonic, Users) {

			var ref = new Firebase("https://scorching-fire-12.firebaseio.com/events");
			// download the data into a local object
			$scope.events = $firebaseArray(ref);
      		$scope.myEvents = [];


			$scope.events.$loaded().then(function(allEvents) {
				var uid = store.get('uid');
				// console.log(uid);
				allEvents.forEach(function(event) {
					// console.log("event " + event.$id + "has attendees "
					//   + JSON.stringify(event.attendees));
					event.attendees.forEach(function(attendee) {
						if (uid === attendee.id) {
							var date = new Date(event.date);
							event.date = date;
							$scope.myEvents.push(event);
						}
					});
				});
			});

			// Setup ownerFilter
			// $scope.owner = [{
			// 	ownerLabel: 'Attended',
			// 	ownerName: 'attended',
			// },{
			// 	ownerLabel: 'Created',
			// 	ownerName: 'created',
			// }];
			$scope.eventFilter = 'attended';

	  		//custom filter function for owner
			$scope.ownerFilter = function (event) {
				var this_uid = store.get('user_id');
				if($scope.eventFilter === 'attended')
					return true;
				else if($scope.eventFilter === 'created' && event.owner === this_uid)
					return true;
				return false;
			};


			//pass data into the eventInformation view specifying which event's information to show
			$scope.clickedEvent = function(e) {
				// var list_of_attendees = e.attendees;
				window.localStorage.setItem("clickedEvent",JSON.stringify(e));
				// window.localStorage.setItem("list_of_attendees", JSON.stringify(list_of_attendees));
			};

			$scope.logout = function() {
				alert("signed out");
				auth.signout();
				store.remove('profile');
				store.remove('token');
				supersonic.ui.layers.pop();
			};
	});
