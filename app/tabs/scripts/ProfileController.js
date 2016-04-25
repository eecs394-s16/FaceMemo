angular
  .module('tabs')
  .controller("ProfileController", function ($scope, supersonic, store) {
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

  });