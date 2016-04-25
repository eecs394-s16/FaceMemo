var tabs = angular.module('tabs');

tabs.controller('LoginCtrl', function(supersonic, $scope, $location, $http, store, auth) {    
	$scope.login = function() {
		auth.signin({
			authParams: {
				scope: 'openid offline_access',
				device: 'Mobile device'
			}
		},
		function(profile, token, accessToken, state, refreshToken) {
			alert(profile.identities[0].access_token);
			var access_token = profile.identities[0].access_token
			var img_url = "https://api.linkedin.com/v1/people/~/picture-urls::(original)?oauth2_access_token=" + access_token
     		store.set('access_token', access_token);
      // supersonic.app.openURL(img_url)
			// function loadPicture() {
			// 	alert("in loadpicture()")
			// 	var x2js = new X2JS();
			// 	$http.get(img_url).then(function(data) {
			// 	// pictureFactory.getPicture().then(function(data) {
			// 		alert("in http get")
			// 		urls = x2js.xml_str2json(data);
			// 		alert("urls.picture-urls.picture-url")
			// 		store.set('pictureUrl', urls.picture-urls.picture-url);
			// 	},
			// 	function(error) {
			// 		alert(JSON.stringify(error));
			// 	});
			// }
			// loadPicture();
			store.set('profile', profile);
			store.set('token', token);
			store.set('refreshToken', refreshToken);
			store.set('user_id', profile.user_id);
			var ref = new Firebase("https://scorching-fire-12.firebaseio.com/users");
			ref.once("value", function(snapshot) {
				if (snapshot.child(profile.user_id).exists()) {
					ref.child(profile.user_id).update({
						name: profile.name,
						LinkedinURL: profile.publicProfileUrl,
						image: store.get('pictureUrl'),
						email: profile.email,
						title: profile.headline,
						url: img_url
					})
			  	}
				else {
					ref.child(profile.user_id).set({
						name: profile.name,
						LinkedinURL: profile.publicProfileUrl,
						image: store.get('pictureUrl'),
						email: profile.email,
						title: profile.headline,
						url: img_url
					});
			  	}
			}) 
			$location.path('/');
			var view = new supersonic.ui.View("tabs#myEvents");
			supersonic.ui.layers.push(view);
		})
	};
});

// tabs.factory('pictureFactory',function($http) {
// 	var factory = [];
// 	factory.getPicture = function(){
// 		alert("here11")
// 		return $http.get("https://api.linkedin.com/v1/people/~/picture-urls::(original)?oauth2_access_token=AQW6UOS7QgqhvSdlLPXub8vBCUNXq8wZRWTR0IrgoVq_IpiXW_BtROr0ITkC7B4wUE2rWagW-uLEKKJveI44hqcWx9qfNK7CsVdBTpP8gvaz2ZY8hP6FyYF4QgWNPaeijT-i_53Fwrd8mQG9VIaHBKeARL_Xuz6sIZucSSw1U8XQuH47BGo");
// 	}
// 	return factory;
// });
