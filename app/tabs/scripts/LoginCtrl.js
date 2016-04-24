angular
  .module('tabs')
  // .controller('LoginCtrl', function(store, $scope, $location, auth) {
  .controller('LoginCtrl', function(supersonic, $firebase, $scope, $location, store, auth) {
    // $scope.users = Users.all();
    // $scope.events = Events.all();

    $scope.login = function() {
      auth.signin({
        authParams: {
          scope: 'openid offline_access',
          device: 'Mobile device'
        }
      }, function(profile, token, accessToken, state, refreshToken) {
        // Success callback
        //console.log("success!" + JSON.stringify(profile));
        store.set('profile', profile);
        store.set('token', token);
        store.set('refreshToken', refreshToken);
        store.set('user_id', profile.user_id);

        //Adding user to firebase if it doesn't exist already
        var ref = new Firebase("https://scorching-fire-12.firebaseio.com/users");
        ref.once("value", function(snapshot) {
          if (snapshot.child(profile.user_id).exists()) {
            ref.child(profile.user_id).update({
              name: profile.name,
              LinkedinURL: profile.publicProfileUrl,
              image: profile.picture,
              email: profile.email,
              title: profile.headline
            })
          }
          else {
            ref.child(profile.user_id).set({
              name: profile.name,
              LinkedinURL: profile.publicProfileUrl,
              image: profile.picture,
              email: profile.email,
              title: profile.headline
            });
          }
        }) 
        auth.getToken({
          api: 'firebase'
        }).then(function(delegation) {
          console.log(delegation.id_token);
          store.set('firebaseToken', delegation.id_token);

          //authentificate with firebase
          var Ref = new Firebase("https://scorching-fire-12.firebaseio.com");
          Ref.authWithCustomToken(store.get('firebaseToken'), function(error, authdata) {
            if (error) {
              // There was an error logging in, redirect the user to login page
              // $state.go('login');
            }
            console.log("auth with firebase done!" + JSON.stringify(authdata));
            console.log("user id is" + authdata.auth.fb_id);
            store.set('uid', authdata.auth.fb_id);
          });


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