angular
  .module('tabs')
  // .controller('LoginCtrl', function(store, $scope, $location, auth) {
  .controller('LoginCtrl', function(supersonic, $scope, $location, store, auth, Users, Events) {
    $scope.test = "Yang";
    $scope.users = Users.all();
    $scope.events = Events.all();
    
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
        auth.getToken({
          api: 'firebase'
        }).then(function(delegation) {
          alert(JSON.stringify(delegation));
          store.set('firebaseToken', delegation.id_token);
          // $state.go('tab.friends');
        }, function(error) {
          console.log("There was an error logging in", error);
        });

        $location.path('/');
        var view = new supersonic.ui.View("tabs#myEvents");
        supersonic.ui.layers.push(view);

      }, function() {
        // Error callback
        alert("error");
      });
    };
});
