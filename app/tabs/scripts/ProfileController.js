angular
  .module('tabs')
  .controller("ProfileController", function ($scope, supersonic, store, updateLocalStorage) {
      
  		 // update localStorage when logged out
    updateLocalStorage();

    // load login page
    function loadLogin() {
      supersonic.ui.layers.pop();
    };

      supersonic.ui.views.current.whenVisible(function() {

      	$scope.uid = store.get("uid");
      	var profile = store.get('profile');
      	// $scope.profile = profile;
      	$scope.attendee = {
      		name: profile.name,
	          LinkedinURL: profile.publicProfileUrl,
	          image: profile.picture,
	          email: profile.email,
              title: profile.headline
      	}
      });

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