angular
  .module('tabs')
  // .controller('LoginCtrl', function(store, $scope, $location, auth) {
  .controller('LoginCtrl', function(supersonic, $scope, $location, store, auth) {    
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
        $location.path('/');
        var view = new supersonic.ui.View("tabs#myEvents");
        supersonic.ui.layers.push(view);

      }, function() {
        // Error callback
        alert("error");
      });
    };
});

// angular
//   .module('tabs')
//   // .controller('LoginCtrl', function(store, $scope, $location, auth) {
//   .controller('LoginCtrl', function(supersonic, $scope, $location, store, auth) {
//     $scope.login = function() {
//       auth.signin({
//         authParams: {
//           scope: 'openid offline_access',
//           device: 'Mobile device'
//         }
//       }, function(profile, token, accessToken, state, refreshToken) {
//         // Success callback
//         //console.log("success!" + JSON.stringify(profile));
//         var ref = new Firebase("https://scorching-fire-12.firebaseio.com/users");
//         $scope.users = $firebaseArray(ref);
//         store.set('profile', profile);
//         store.set('token', token);
//         store.set('refreshToken', refreshToken);
//         $location.path('/');
//         ref.once("value", function(snapshot) {
//           var a = snapshot.child("email").exists();
//           if a == true {
//             alert("true");
//           }
//         }
//         var view = new supersonic.ui.View("tabs#myEvents");
//         supersonic.ui.layers.push(view);

//       }, function() {
//         // Error callback
//         alert("error");
//       });
//     };
// });
//     }
//   }

// angular
//   .module('tabs')
//   .controller('SettingsController', function($scope, supersonic) {
//     var ref = new Firebase("https://scorching-fire-12.firebaseio.com");
//     $scope.submit = function() {
//       $scope.test = $scope.role
//       ref.createUser({
//         email: $scope.email,
//         password: $scope.password
//       }, function(error, userData) {
//         if (error) {
//         switch (error.code) {
//             case "EMAIL_TAKEN":
//               alert("The new user account cannot be created because the email is already in use.");
//               break;
//             case "INVALID_EMAIL":
//               alert("The specified email is not a valid email.");
//               break;
//             default:
//               alert(error);
//           }
//       } else {
//         var usersRef = ref.child("users");
//         usersRef.push().set({
//             email: $scope.email,
//             name: $scope.name,
//             company: $scope.company,
//             position: $scope.position,
//             linkedinurl: $scope.linkedin, 
//             role: $scope.role,
//             id: userData.uid
//         });
//         alert("Your account was successfully created")
//       }
//     });
//     }
// });
