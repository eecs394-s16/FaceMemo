angular.module('tabs')

/**
 * A simple example service that returns some data.
 */
.service('Users', function($firebaseArray, store) {

  var usersRef = new Firebase("https://scorching-fire-12.firebaseio.com/users");
  usersRef.authWithCustomToken(store.get('firebaseToken'), function(error, auth) {
    if (error) {
      // There was an error logging in, redirect the user to login page
      // $state.go('login');
    }
  });
  var users = $firebaseArray(usersRef);
  // var usersSync = $firebase(usersRef);
  // var users = usersSync.$asArray();

  this.all = function() {
    return users;
  };

  this.add = function(user) {
    users.$add(user);
  };

  this.get = function(id) {
    return users.$getRecord(id);
  };

  this.save = function(user) {
    users.$save(user);
  };

  this.delete = function(user) {
    users.$remove(user);
  };
})



.service('Events', function($firebaseArray, store) {

  var eventsRef = new Firebase("https://scorching-fire-12.firebaseio.com/events");
  eventsRef.authWithCustomToken(store.get('firebaseToken'), function(error, auth) {
    if (error) {
      // There was an error logging in, redirect the user to login page
      // $state.go('login');
    }
  });
  var events = $firebaseArray(eventsRef);
  // var eventsSync = $firebase(eventsRef);
  // var events = eventsSync.$asArray();

  this.all = function() {
    return events;
  };

  this.add = function(event) {
    events.$add(event);
  };

  this.get = function(id) {
    return events.$getRecord(id);
  };

  this.save = function(event) {
    events.$save(event);
  };

  this.delete = function(event) {
    events.$remove(event);
  };
});
