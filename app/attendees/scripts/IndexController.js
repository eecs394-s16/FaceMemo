angular
  .module('attendees')
  .controller("IndexController", function ($scope, Attendees, supersonic) {
    $scope.attendeess = null;
    $scope.showSpinner = true;

    Attendees.all().whenChanged( function (attendeess) {
        $scope.$apply( function () {
          $scope.attendeess = attendeess;
          $scope.showSpinner = false;
        });
    });
  });