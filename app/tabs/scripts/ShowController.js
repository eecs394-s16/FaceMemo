angular
  .module('attendees')
  .controller("ShowController", function ($scope, Attendees, supersonic) {
    $scope.attendees = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;

    var _refreshViewData = function () {
      Attendees.find($scope.dataId).then( function (attendees) {
        $scope.$apply( function () {
          $scope.attendees = attendees;
          $scope.showSpinner = false;
        });
      });
    }

    supersonic.ui.views.current.whenVisible( function () {
      if ( $scope.dataId ) {
        _refreshViewData();
      }
    });

    supersonic.ui.views.current.params.onValue( function (values) {
      $scope.dataId = values.id;
      _refreshViewData();
    });

    $scope.remove = function (id) {
      $scope.showSpinner = true;
      $scope.attendees.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    }
  });