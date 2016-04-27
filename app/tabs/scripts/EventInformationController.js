angular
  .module('tabs')
  .controller("EventInformationController", function ($scope, supersonic, store, Events, Users, updateLocalStorage) {

      // download the data into a local object
      $scope.users = Users.all();


      // update localStorage when logged in/out
      updateLocalStorage();

      // add event listener for updating event info when logging in/out
      window.addEventListener("message", function(event) {
        var keyList = ['profile', 'token', 'uid', 'user_id', 'refreshToken'];
        for (key in event.data) {
          if (keyList.indexOf(key) > -1) {
            updateEventInfo();
            return;
          }
        }
      });


      //retrieves the clicked_event on view load
      supersonic.ui.views.current.whenVisible(function() {
        var clicked_event = window.localStorage.getItem("clicked_event");
        $scope.event = JSON.parse(clicked_event);
        var date = new Date($scope.event.date);
        $scope.event.date = date;
      });

      //update event information
      function updateEventInfo () {
        $scope.attendees = [];
        $scope.joinStatus = 'Join';
        $scope.joinRole = 'student';
              //when users gets fetched from firebase, this function runs
        $scope.users.$loaded().then(function(list_of_users) {
          var uid = '';
          uid = store.get('uid');  // id of current user
          console.log(uid);

          var list_of_attendees = $scope.event.attendees;
          //for each attendee, fetch his record from firebase and push it into $scope.attendees
          for (var i = 0; i < list_of_attendees.length; i++)
          {
            var user_id = list_of_attendees[i].id;
            var rec = list_of_users.$getRecord(user_id);
            $scope.attendees.push(rec);

            // determine user join status and role if in attendee list
            if(uid === user_id) {
              $scope.joinStatus = 'Joined';
              $scope.joinRole = list_of_attendees[i].role;
            }
          }
        });
        $scope.$apply();
      };

      updateEventInfo();


      //join and unjoin
      $scope.join = function() {
        var uid = '';
        uid = store.get('uid');
        if (!uid) {
          alert("Please log in to join events!");
        }
        else {
          if ($scope.joinStatus === 'Join') {
            $scope.joinStatus = 'Joined';
            // update event attendee list
            var currentEvent = Events.get($scope.event.$id);
            // console.log("current event is: " + angular.toJson(currentEvent));
            currentEvent.attendees.push({
              id: uid,
              role: $scope.joinRole
            });
            // console.log("updated event is: " + angular.toJson(currentEvent));
            Events.save(currentEvent);

            //update user myEvents list
            var currentUser = Users.get(uid);
            currentUser.myEvents.push($scope.event.$id);
            Users.save(currentUser);
          }

          else {
            $scope.joinStatus = 'Join';
            //update event attendee list
            var currentEvent = Events.get($scope.event.$id);
            var attendeeList = currentEvent.attendees;
            currentEvent.attendees = attendeeList.filter(function(obj) {
              return !(obj.id === uid);
            });
            Events.save(currentEvent);
            //update user myEvents list
            var currentUser = Users.get(uid);
            var myEventsList = currentUser.myEvents;
            currentUser.myEvents = myEventsList.filter(function(eventId) {
              return !(eventId === $scope.event.$id);
            });
            Users.save(currentUser);
          }
        }

      };

      // event handler when joinRole changes
      $scope.$watch('joinRole', function(newRole, oldRole) {
        var uid = '';
        uid = store.get('uid');
        if (uid) {
          console.log("role changed from" + oldRole + " to " + newRole);
          if ($scope.joinStatus === 'Joined') {
            var currentEvent = Events.get($scope.event.$id);
            currentEvent.attendees.forEach(function(attendee) {
              if (attendee.id === uid) {
                attendee.role = newRole;
                console.log("user " + uid + " 's role changed!");
              }
            });
            Events.save(currentEvent);
          }
        }

      });



	    //pass data containing list of attendees into the attendees view
      $scope.clickedEvent = function() {
        var list_of_attendees = $scope.event.attendees;
        window.localStorage.setItem("clickedEvent", JSON.stringify($scope.event));
        window.localStorage.setItem("list_of_attendees", JSON.stringify(list_of_attendees));
      };

      //keeps track of which attendee the user clicks
      $scope.clickedAttendee = function(attendee) {
        window.localStorage.setItem("clicked_attendee", JSON.stringify(attendee));
        $scope.test = attendee;
      };
  });
