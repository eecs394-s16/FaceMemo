angular
  .module('tabs')
  .controller("EventInformationController", ["$scope", "$firebaseArray", "supersonic", "store", "Events", "Users", function ($scope, $firebaseArray, supersonic, store, Events, Users) {
  		var ref = new Firebase("https://scorching-fire-12.firebaseio.com/users");
      // download the data into a local object
      $scope.users = $firebaseArray(ref);
      $scope.attendees = [];
      $scope.joinStatus = 'Join';
      $scope.joinRole = 'student';

      //retrieves the clicked_event on view load
      supersonic.ui.views.current.whenVisible(function() {
        var clicked_event = window.localStorage.getItem("clicked_event");
        $scope.event = JSON.parse(clicked_event);
        var date = new Date($scope.event.date);
        $scope.event.date = date;
      });



      //when users gets fetched from firebase, this function runs
      $scope.users.$loaded().then(function(list_of_users) {
        var uid = store.get('uid');  // id of current user
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

      //join and unjoin
      $scope.join = function() {
        var uid = store.get('uid');
        if (!uid) {
          alert("Please log in to join events!");
        }
        else {
          if ($scope.joinStatus === 'Join') {
            $scope.joinStatus = 'Joined';
            $scope.event.attendees.push({
              id: uid,
              role: $scope.joinRole
            });
            console.log("current event:" + JSON.stringify($scope.event));
            Events.save($scope.event);
          }
          else {
            $scope.joinStatus = 'Join';
          }
        }

      };



	    //pass data containing list of attendees into the attendees view
      $scope.clickedEvent = function() {
        var list_of_attendees = $scope.event.attendees;
        window.localStorage.setItem("list_of_attendees", JSON.stringify(list_of_attendees));
      };

      //keeps track of which attendee the user clicks
      $scope.clickedAttendee = function(attendee) {
        window.localStorage.setItem("clicked_attendee", JSON.stringify(attendee));
        $scope.test = attendee;
      };
  }]);
