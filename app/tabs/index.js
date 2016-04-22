angular.module('tabs', [
  // Declare here all AngularJS dependencies that are shared by the example module.
  'supersonic', 'common', 'firebase','auth0',
  'angular-storage',
  'angular-jwt'
])
.config(function(authProvider) {
	authProvider.init({
    domain: 'eecs394yellow.auth0.com',
    clientID: 'CkLBEkg9yM1HvfGVk4NDjw3QcWydXd4F',
    // loginState: 'login' // This is the name of the state where you'll show the login, which is defined above...
  });
})
.run(function(auth) {
  // This hooks all auth events to check everything as soon as the app starts
  auth.hookEvents();
});

