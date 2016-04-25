angular
  .module('tabs')
  .controller('AddEventCtrl', function($scope, $firebaseArray, supersonic, store) {
    var ref = new Firebase("https://scorching-fire-12.firebaseio.com");
    $scope.submit = function() {
		var eventsRef = ref.child("events");
		var myuid = store.get('user_id')
		eventsRef.push().set({
			name: $scope.name,
			description: $scope.description,
			location: $scope.location,
			date: $scope.date.toString(),
			starttime: $scope.starttime.toString(),
			stoptime: $scope.endtime.toString(),
			owner: myuid
		});
		alert("Your event was successfully created")
		supersonic.ui.layers.pop();
    }
});