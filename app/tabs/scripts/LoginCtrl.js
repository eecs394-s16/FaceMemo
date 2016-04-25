angular
  .module('tabs')
  // .controller('LoginCtrl', function(store, $scope, $location, auth) {
  .controller('LoginCtrl', function(supersonic, $firebase, $scope, $location, store, auth, updateLocalStorage) {

    // update localStorage when logged out
    updateLocalStorage();

    // if logged in, skip login page


    function loadMyEvents() {
      var newView = new supersonic.ui.View("tabs#myEvents");
      supersonic.ui.layers.push(newView);
    };

    // if logged in, skip auth page
            //update all localStorage items

    if (store.get('profile')) {
      loadMyEvents();
    }

    $scope.login = function() {
      //if logged in, skip auth page
      //update all localStorage items

      if (store.get('profile')) {
        console.log(store.get('profile'));
        loadMyEvents();
        return;
      }

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

        //update all localStorage items
        window.postMessage({
          'profile': store.get('profile'),
          'token': store.get('token'),
          'uid': store.get('user_id'), // note 'uid' is posted in promise, delayed
          'refreshToken': store.get('refreshToken'),
          'user_id': store.get('user_id')
        });

        $location.path('/');

        loadMyEvents();

      }, function() {
        // Error callback
        alert("error");
      });
    };
});