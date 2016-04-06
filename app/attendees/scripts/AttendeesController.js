angular
  .module('attendees')
  .controller("AttendeesController", ["$scope", "$firebaseArray", 
    function ($scope, $firebaseArray) {
      var ref = new Firebase("https://scorching-fire-12.firebaseio.com/users");
      
  }]);
