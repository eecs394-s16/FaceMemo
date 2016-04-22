angular
  .module('tabs')
  // .controller('LoginCtrl', function(store, $scope, $location, auth) {
  .controller('UserInfoCtrl', function($scope, $location, store, auth) {
    $scope.user = "Yang";

    // logout 
    $scope.logout = function() {
    auth.signout();
    store.remove('profile');
    store.remove('token');
}
    //
});