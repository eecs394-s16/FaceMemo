angular
  .module('tabs')
  .controller('SettingsController', function($scope, supersonic) {
    var ref = new Firebase("https://scorching-fire-12.firebaseio.com");
    $scope.submit = function() {
    	$scope.test = $scope.role
    	ref.createUser({
    		email: $scope.email,
    		password: $scope.password
    	}, function(error, userData) {
  			if (error) {
				switch (error.code) {
			      case "EMAIL_TAKEN":
			        alert("The new user account cannot be created because the email is already in use.");
			        break;
			      case "INVALID_EMAIL":
			        alert("The specified email is not a valid email.");
			        break;
			      default:
			        alert(error);
			    }
			} else {
				var usersRef = ref.child("users");
				usersRef.push().set({
				    email: $scope.email,
				    name: $scope.name,
				    company: $scope.company,
				    position: $scope.position,
				    linkedinurl: $scope.linkedin, 
				    role: $scope.role,
				    id: userData.uid
				});
				alert("You're account was successfully created")
			}
		});
    }
});
