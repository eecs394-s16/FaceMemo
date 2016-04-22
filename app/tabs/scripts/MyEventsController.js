angular
  .module('tabs')
  .controller("MyEventsController", function ($scope, $firebaseArray, auth, store, supersonic) {
      var ref = new Firebase("https://scorching-fire-12.firebaseio.com/events");
      // download the data into a local object
      $scope.events = $firebaseArray(ref);

      $scope.events.$loaded().then(function() {
        for (var i = 0; i < $scope.events.length; i++) {
          var date = new Date($scope.events[i].date);
          $scope.events[i].date = date;
        }
      });

      
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
