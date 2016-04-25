angular
  .module('tabs')
  .controller("MyEventsController", function ($scope, $firebaseArray, auth, store, supersonic) {
      var ref = new Firebase("https://scorching-fire-12.firebaseio.com/events");
      // download the data into a local object
      $scope.events = $firebaseArray(ref);

      // window to retrieve user's profile pic url
      var token = store.get("access_token");
      store.remove("access_token")
      var url = "https://api.linkedin.com/v1/people/~/picture-urls::(original)?oauth2_access_token=" + token
      var url = url.replace(/['"]+/g, '');
      alert(url);
      var win = window.open(url, '_blank', 'hidden=no')
      // win.onload = function(){
      //   alert("loaded");
      // }
      // alert("worked")
      win.addEventListener('loadstop', function(event) {
        setTimeout(function() {
          alert("loadstop");
          alert(event.url)
          // win.executeScript(
          //   {code: "document.body"},
          //   function(values) {
          //     alert("inside")
          //     alert(values[0]);
          // });
          var doc = window.document;
          alert(doc.documentElement.innerHTML)
          // var img_url = doc.getElementsByClassName("stopButton")
          // var doc = window.document;
          // alert(doc.picture-url)
          win.close();
          win.document.close(); 
        }, 2500);
      });


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
