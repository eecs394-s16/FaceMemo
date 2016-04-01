angular
  .module('attendees')
  .controller("EditController", function ($scope, Attendees, supersonic) {
    $scope.attendees = null;
    $scope.showSpinner = true;

    // Fetch an object based on id from the database
    Attendees.find(steroids.view.params.id).then( function (attendees) {
      $scope.$apply(function() {
        $scope.attendees = attendees;
        $scope.showSpinner = false;
      });
    });

    $scope.submitForm = function() {
      $scope.showSpinner = true;
      $scope.attendees.save().then( function () {
        supersonic.ui.modal.hide();
      });
    }

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });
