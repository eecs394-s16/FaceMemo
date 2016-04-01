angular
  .module('attendees')
  .controller("NewController", function ($scope, Attendees, supersonic) {
    $scope.attendees = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newattendees = new Attendees($scope.attendees);
      newattendees.save().then( function () {
        supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });