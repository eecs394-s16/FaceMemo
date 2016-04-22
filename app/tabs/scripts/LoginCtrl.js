angular
  .module('tabs')
  // .controller('LoginCtrl', function(store, $scope, $location, auth) {
  .controller('LoginCtrl', function(supersonic, $scope, $location, store, auth) {
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
        console.log("success!" + JSON.stringify(profile));
        store.set('profile', profile);
        store.set('token', token);
        store.set('refreshToken', refreshToken);
        $location.path('/');
        var view = new supersonic.ui.View("tabs#myEvents");
        supersonic.ui.layers.push(view);

      }, function() {
        // Error callback
        alert("error");
      });
    };
});
