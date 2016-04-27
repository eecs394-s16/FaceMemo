angular
  .module('tabs')
  .controller("ShowController", function ($scope, supersonic) {
      supersonic.ui.views.current.whenVisible(function() {
          var clicked_attendee = window.localStorage.getItem("clicked_attendee");
          $scope.attendee = JSON.parse(clicked_attendee);
      });
  });