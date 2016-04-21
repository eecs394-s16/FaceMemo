angular
  .module('tabs')
  // .controller('LoginCtrl', function(store, $scope, $location, auth) {
  .controller('LoginCtrl', function($scope, $location) {
    $scope.test = "Yang";
    $scope.login = function() {
      $scope.test = "Yang logging in";
      auth.signin({
        authParams: {
          scope: 'openid offline_access',
          device: 'Mobile device'
        }
      }, function(profile, token, accessToken, state, refreshToken) {
        // Success callback
        store.set('profile', profile);
        store.set('token', token);
        store.set('refreshToken', refreshToken);
        $location.path('/');
      }, function() {
        // Error callback
      });
    }
}