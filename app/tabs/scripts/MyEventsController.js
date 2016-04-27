angular
  .module('tabs')
  .controller("MyEventsController", function ($scope, auth, store, supersonic, Users, updateLocalStorage, Events) {
    $scope.user = store.get('profile').name || 'guest';
    $scope.eventTab = 'myEvents';
      // update localStorage when logged out
    updateLocalStorage();

      // add event listener for updating event info when logging out
      window.addEventListener("message", function(event) {
        var keyList = ['profile', 'token', 'uid', 'user_id', 'refreshToken'];
        for (key in event.data) {
          // note this view is always rendered when logging in, no need to
          // monitor login event and updateMyEvents() twice
          if (keyList.indexOf(key) > -1 && event.data[key] == null) {
            updateMyEvents();
            return;
          }
        }
      });

    // load login page
    function loadLogin() {
      supersonic.ui.layers.pop();
    };


      // var ref = new Firebase("https://scorching-fire-12.firebaseio.com/events");
      // download the data into a local object
      $scope.events = Events.all();
      $scope.myEvents = [];

      $scope.events.$loaded().then(function() {
        updateMyEvents();
        $scope.events.$watch(function(data) {
          updateMyEvents();
        });
      });


      // ref.on("value", updateMyEvents);

      // function to update myEvents for the current user
      function updateMyEvents () {
        $scope.myEvents=[];
        var uid = store.get('uid');
        // console.log(uid);
        if(uid) {
          console.log("all events: " +$scope.events);
          $scope.events.forEach(function(event) {
            // console.log("event " + event.$id + "has attendees "
            //   + JSON.stringify(event.attendees));
            if (event.attendees && event.attendees.length > 0) {
              event.attendees.forEach(function(attendee) {
                if (uid === attendee.id) {
                  var date = new Date(event.date);
                  event.date = date;
                  console.log("adding event"+event.$id + "from user " + uid);
                  $scope.myEvents.push(event);
                }
              });
            }
          });
        }
        else {
          loadLogin();
        }

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
        console.log("clicked event: " + e.$id);
        window.localStorage.setItem("clickedEvent",JSON.stringify(e));
        // window.localStorage.setItem("list_of_attendees", JSON.stringify(list_of_attendees));
      };

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
