angular
  .module('tabs')
  .controller("ProfileController", function ($scope, supersonic, store, updateLocalStorage, auth) {


    //load current user's information when view in scope
    updateUserInfo();

  	// update localStorage when logged out
    updateLocalStorage();

    // add event listener for updating event info when logging in/out
    window.addEventListener("message", function(event) {
      var keyList = ['profile', 'token', 'uid', 'user_id', 'refreshToken'];
      for (key in event.data) {
        if (keyList.indexOf(key) > -1) {
          console.log("updating user info when logging in/out");
          updateUserInfo();
          return;
        }
      }
    });


    function updateUserInfo() {
      $scope.attendee = null;

      var profile= store.get('profile');
      if (profile) {
        console.log("inside if in updating profile");
        $scope.attendee = {
          name: profile.name,
          LinkedinURL: profile.publicProfileUrl,
          image: profile.picture,
          email: profile.email,
          title: profile.headline
        };
      }
      $scope.$apply();
    };

    // load a new login page in tab 'My Events'
    function loadLogin() {
      supersonic.ui.initialView.show();
      // var view = new supersonic.ui.View({
      //   location: "tabs#login",
      //   id: "login"
      // });
      // // select tab 'My Events', 1st tab from the left
      // supersonic.ui.tabs.select(0).then(function() {
      //   console.log('switched to tab MyEvents');
      //   view.start("login").then( function(startedView) {
      //     supersonic.ui.layers.replace(startedView);
      //   });
      // }, function(error) {
      //   console.log("switching tab error" + error);
      // });
    };

      $scope.login = loadLogin;

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