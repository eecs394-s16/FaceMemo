(function(){
  angular
    .module('tabs')
    .factory("eventFactory", function() {

      var factory = {};
      factory.currentEvent = {};

      factory.setEvent = function (input) {
        factory.currentEvent = input;
      };

      factory.getEvent = function() {
        return factory.currentEvent;
      }

      return factory;
  });
}());