angular
	.module('tabs')
	.controller("LoginController", ["$scope", "$cordovaOauth", "$q", "$http", function($scope, $cordovaOauth, $q, $http) {
		var clientId = '77ouzqqmag9qjl';
		var clientSecret = 'rShLnylQZT6aDY3F';
		var redirect_uri = "https://www.google.com/callback";
		// var appScope = ['r_fullprofile', 'r_emailaddress', 'w_share'];
		var appScope = ['r_basicprofile'];
		var state = 'DCEeFWf45A53sdfKef424';
		var requestResult = '';
		var requestToken = 'initial token';
		
		var googleId = '660162080308-sd11qvhro3dkrriik5n0mj98vgakp1hn.apps.googleusercontent.com';
		var googleSecret = 'bg-fOYIUfKOaVgxtT1x-NSZx';

		$scope.result = 'initial';
		$scope.anyError = false;
		$scope.vib = "no vibration";
		$scope.alert ="no alert yet";
		$scope.appUrl = "no url";
		$scope.googleResult = "google not signed in";

		$scope.googleLogin = function() {
			$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
			document.addEventListener("deviceready", onDeviceReady, false);
			function onDeviceReady() {
				var ref = window.open('https://accounts.google.com/o/oauth2/auth?client_id=' + googleId + '&redirect_uri=https://www.google.com/callback&scope=https://www.googleapis.com/auth/urlshortener&approval_prompt=force&response_type=code&access_type=offline', '_blank', 'location=yes');
			// 	// var ref = window.open('https://accounts.google.com/o/oauth2/auth?client_id=' + googleId + '&redirect_uri=https://localhost/callback&scope=https://www.googleapis.com/auth/urlshortener&approval_prompt=force&response_type=code&access_type=offline', '_blank', 'location=yes');

				ref.addEventListener('loadstart', function(event) {
					$scope.googleResult = event.url;
					if ((event.url).indexOf(redirect_uri) === 0) {
						requestToken = (event.url).split("code=")[1];
		                $http({method: "post", url: "https://accounts.google.com/o/oauth2/token", data: "client_id=" + googleId + "&client_secret=" + googleSecret + "&redirect_uri=https://www.google.com/callback" + "&grant_type=authorization_code" + "&code=" + requestToken })
		                    .success(function(data) {
		                    	alert(data.access_token);
		                        // accessToken = data.access_token;
		                        // $location.path("/secure");
		                    })
		                    .error(function(data, status) {
		                        alert("ERROR: " + status);
		                    });
		                ref.close();
					}		    
				});
			}		
		};

		// $scope.googleLogin = function() {
		// 	$cordovaOauth.google(googleId, ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
		// 		$scope.googleResut = JSON.stringify(result);
		// 	}, function(error) {
		// 		$scope.googleResult = error;
		// 		// console.log(error);
		// 	});
		// };
		
		$scope.linkedinLogin = function() {
			var deferred = $q.defer();
			var browserRef = window.open('https://www.linkedin.com/uas/oauth2/authorization?client_id=' + clientId + '&redirect_uri=' + redirect_uri + '&scope=' + appScope.join(" ") + '&response_type=code&state=' + state, '_blank', 'location=yes,clearsessioncache=yes,clearcache=yes');
			// var browserRef = window.open('https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=77ouzqqmag9qjl&redirect_uri=http://www.google.com/callback&state=DCEeFWf45A53sdfKef424&scope=r_basicprofile','_blank','location=yes');

			browserRef.addEventListener('loadstart', function(event) {
	            if((event.url).indexOf(redirect_uri) === 0) {
	              try {
	                requestToken = (event.url).split("code=")[1].split("&")[0];
	                alert(requestToken);
	                $http({method: "POST", headers: {'Content-Type': 'application/x-www-form-urlencoded'}, url: "https://www.linkedin.com/uas/oauth2/accessToken", data: "client_id=" + clientId + "&client_secret=" + clientSecret + "&redirect_uri=" + redirect_uri + "&grant_type=authorization_code" + "&code=" + requestToken })
	                // $http({method: "POST", headers: {'Content-Type': 'application/x-www-form-urlencoded'}, url: "https://www.linkedin.com/uas/oauth2/accessToken", data: "client_id=77ouzqqmag9qjl&client_secret=rShLnylQZT6aDY3F&redirect_uri=https%3A%2F%2Fwww.google.com%2Fcallback&grant_type=authorization_code&code=" + requestToken })
	                  .success(function(data) {
	                    deferred.resolve(data);
	                  })
	                  .error(function(data, status) {
	                    deferred.reject(status);
	                  })
	                  .finally(function() {
	                    setTimeout(function() {
	                        browserRef.close();
	                    }, 10);
	                  });
	              } catch(e){	              	
		                setTimeout(function() {
		                    browserRef.close();
		                }, 10);
		          }
	            }
	            var oauthResult = deferred.promise;
	           	oauthResult.then(function(result) {
	           		alert(result.access_token);
	           	}, function(error) {
	           		alert(error);
	           	});










	            
				// $scope.result = "some pages loaded!"
				// $scope.appUrl = event.url;
				// if ((event.url).indexOf(redirectUri) === 0) {
				// 	// alert(event.url);
				// 	// alert($scope.appUrl);
				// 	requestResult = (event.url).split("code=")[1];
				// 	requestToken = requestResult.split("&state=")[0];
				// 	// alert(requestToken);
				// 	ref.close();
				// }		    
			});

		};

	}]);
