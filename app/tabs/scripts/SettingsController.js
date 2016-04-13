angular
  .module('tabs')
  .controller('SettingsController', function($scope, $auth, supersonic) {
    $scope.navbarTitle = "Settings";
    $scope.isAuthenticated = function() {
  		return $auth.isAuthenticated();
    };

    $scope.test = "hi";

    $scope.linkedinLogin = function() {
      document.getElementById("p1").innerHTML = "New text!";
      $auth.authenticate('linkedin')
        .then(function(response) {
          $window.localStorage.currentUser = JSON.stringify(response.data.user);
          $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
        })
        .catch(function(response) {
          console.log(response.data);
        })
    };
});