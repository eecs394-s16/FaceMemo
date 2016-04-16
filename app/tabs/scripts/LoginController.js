angular
	.module('tabs')
	.controller("LoginController", ["$scope", "$cordovaOauth", function($scope, $cordovaOauth) {
		var clientId = '77ouzqqmag9qjl';
		var clientSecret = 'rShLnylQZT6aDY3F';
		var redirectUri = 'http://localhost/callback';
		// var appScope = ['r_fullprofile', 'r_emailaddress', 'w_share'];
		var appScope = ['r_basicprofile'];
		var state = 'DCEeFWf45A53sdfKef424';
		
		var googleId = '660162080308-kjm573smuc8hvr10ha16rhpoak7s7mb3.apps.googleusercontent.com';
		var googleSecret = 'PDbrAQHsi8uVwPIx6-uk_8V7';

		$scope.result = 'initial';
		$scope.anyError = false;
		$scope.vib = "no vibration";
		$scope.alert ="no alert yet";
		$scope.googleResult = "google not signed in";


		$scope.googleLogin = function() {
			$cordovaOauth.google(googleId, ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
				$scope.googleResut = JSON.stringify(result);
			}, function(error) {
				$scope.googleResult = error;
				console.log(error);
			});
		};
		
		$scope.linkedinLogin = function() {
			$scope.result = "button pressed!"

			document.addEventListener("deviceready", onDeviceReady, false);
			function onDeviceReady() {
			    console.log(navigator.vibrate);
			    navigator.vibrate(3000);

			}
			
			var ref = window.open('http://localhost/callback?code=AQTICOKPQv8-ibAoQpPuC8dk1ehIZ_jnCO4FR02HK6BIAXSygNIYWwW47aKI5biFFx7xacORZj0y9hneizX&XyAO0xcA0w1a9BItIQPBzznL8UWgnxQ&stage=DCEeFWf45A53sdfKef424','_blank','location=yes');

			// $cordovaOauth.linkedin(clientId, clientSecret, appScope, state).then(function(result) {
			// 	$scope.result = JSON.stringify(result);
			// }, function(error) {
			// 	$scope.anyError = error;
			// });

			// var ref = window.open('http://www.google.com', '_blank','location=yes');

			// var ref = window.open('https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id='
			// 	+cliendId+ '&redirect_uri='+redirectUri+'&state='+state+'&scope='+'r_basicprofile','_blank','location=no');

			// var ref = window.open('https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=77ouzqqmag9qjl&redirect_uri=http%3A%2F%2Flocalhost%2Fcallback&state=DCEeFWf45A53sdfKef424&scope=r_basicprofile','_blank','location=no');
			// var ref = window.open('https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=77ouzqqmag9qjl&redirect_uri=http://localhost/callback&state=DCEeFWf45A53sdfKef424&scope=r_basicprofile','_blank','location=yes');











			function alertDismissed() {
			    $scope.alert = 'alert dismissed!';
			}

			navigator.notification.alert(
			    'You are the winner!',  // message
			    alertDismissed,         // callback
			    'Game Over',            // title
			    'Done'                  // buttonName
			);



			// $cordovaOauth.linkedin(clientId, clientSecret, appScope, state).then(function(result) {
			// 	$scope.result = JSON.stringify(result);
			// }, function(error) {
			// 	$scope.anyError = error;
			// });
		};

	}]);
