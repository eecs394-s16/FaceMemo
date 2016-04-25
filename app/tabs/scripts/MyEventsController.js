angular 
  .module('tabs')
  .controller("MyEventsController", function ($scope, $firebaseArray, auth, store, supersonic, Users, updateLocalStorage) {
    $scope.user = store.get('profile').name || 'guest';

      // update localStorage when logged out
    updateLocalStorage();

    // load login page
    function loadLogin() {
      supersonic.ui.layers.pop();
    };

      var ref = new Firebase("https://scorching-fire-12.firebaseio.com/events");
      // download the data into a local object
      $scope.events = $firebaseArray(ref);
      $scope.myEvents = [];

      $scope.events.$loaded().then(function() {
        updateMyEvents();
      });

      ref.on("value", updateMyEvents);

      // function to update myEvents for the current user
      function updateMyEvents () {
        $scope.myEvents=[];
        var uid = store.get('uid');
        // console.log(uid);
        $scope.events.forEach(function(event) {
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
      };

    //make attended default value
	$scope.eventFilter = 'attended';

	//custom filter function for owner
	$scope.ownerFilter = function (event) {
		var this_uid = store.get('user_id');
		if($scope.eventFilter === 'attended')
			return true;
		else if($scope.eventFilter === 'created' && event.owner === this_uid)
			return true;
		return false;
	}


      //pass data into the eventInformation view specifying which event's information to show
      $scope.clickedEvent = function(e) {
      	// var list_of_attendees = e.attendees;
        window.localStorage.setItem("clickedEvent",JSON.stringify(e));
        // window.localStorage.setItem("list_of_attendees", JSON.stringify(list_of_attendees));
      };


      	$scope.addEvent = function() {
      		var newView = new supersonic.ui.View("tabs#addEvent");
      		supersonic.ui.layers.push(newView);
      	}

      $scope.logout = function() {
        alert("signed out");

        //update all localStorage items
        store.remove('profile');
        store.remove('token');
        store.remove('uid');
        window.postMessage({
          'profile': null,
          'token': null,
          'uid':null
        });

        auth.signout();
        loadLogin();
      };
  });
