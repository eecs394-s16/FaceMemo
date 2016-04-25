angular
  .module('tabs')
  .controller("MyEventsController", function ($scope, $firebaseArray, auth, store, supersonic, Users) {


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
        console.log(store.get('uid'));
        store.remove('uid');
        console.log(store.get('uid'));
        supersonic.ui.layers.pop();
      };
  });
