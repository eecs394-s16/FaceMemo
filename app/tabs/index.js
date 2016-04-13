angular.module('tabs', [
  // Declare here all AngularJS dependencies that are shared by the example module.
  'supersonic', 'common', 'firebase', 'satellizer'])
  .config(function($authProvider) {
    $authProvider.linkedin({
      clientId: '77zxhwq7a7556j'
    });
    $authProvider.httpInterceptor = function() { return true; },
		$authProvider.withCredentials = true;
		$authProvider.tokenRoot = null;
		$authProvider.baseUrl = '/';
		$authProvider.loginUrl = '/auth/login';
		$authProvider.signupUrl = '/auth/signup';
		$authProvider.unlinkUrl = '/auth/unlink/';
		$authProvider.tokenName = 'token';
		$authProvider.tokenPrefix = 'satellizer';
		$authProvider.authHeader = 'Authorization';
		$authProvider.authToken = 'Bearer';
		$authProvider.storageType = 'localStorage';
});