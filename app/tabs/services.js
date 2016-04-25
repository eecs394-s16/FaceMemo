angular.module('tabs')

/**
 * A simple example service that returns some data.
 */
.service('Users', function($firebaseArray, store) {
  var uid = '';
  var myEvents = [];
  var usersRef = new Firebase("https://scorching-fire-12.firebaseio.com/users");
  // usersRef.authWithCustomToken(store.get('firebaseToken'), function(error, authdata) {
  //   if (error) {
  //     // There was an error logging in, redirect the user to login page
  //     // $state.go('login');
  //   }
  //   uid = authdata.auth.fb_id;
  // });

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
    // console.log("saving event:" + angular.toJson(event));
    // console.log("overwriting event:"
    //   + angular.toJson(events.$getRecord(event['$id'])));

    // console.log("current events:" + angular.toJson(events));
    events.$save(event).then(function() {
      // console.log("Succeeded! new events:" + angular.toJson(events));
    }, function(error) {
      // console.log(error);
      console.log("error! : " + angular.toJson(error));
    });
    //
    //
    // var eventId = event['$id'];
    // delete event['$id'];
    // delete event['$priority'];
    // eventsRef.child(eventId).set(event);
    // console.log("updated events:" + JSON.stringify(events));

  };

  this.delete = function(event) {
    events.$remove(event);
  };
});
