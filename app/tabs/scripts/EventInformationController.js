angular
  .module('tabs')
  .controller("EventInformationController", ["$scope", "$firebaseArray", "supersonic", function ($scope, $firebaseArray, supersonic) {
  		supersonic.ui.views.current.whenVisible(function() {
		    var clicked_event = window.localStorage.getItem("clicked_event");
		    $scope.event = JSON.parse(clicked_event);
		});
  }]);
