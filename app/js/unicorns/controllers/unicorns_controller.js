'use strict';

module.exports = function(app) {
  app.controller('UnicornsController', ['$scope', 'resource', function($scope, resource) {
    $scope.unicorns = [];

    var Unicorn = resource('unicorns');
    
    $scope.getAll = function(){
      Unicorn.getAll(function(data) {
        $scope.unicorns = data;
      });
    };

    $scope.create = function(unicorn){
      Unicorn.create(unicorn, function(data) {
        $scope.unicorns.push(data);
      })
    };

    $scope.save = function(unicorn) {
      Unicorn.save(unicorn, function(data) {
        unicorn.editing = false;
      })
    };

    $scope.remove = function(unicorn) {
      Unicorn.remove(unicorn, function(){
        $scope.unicorns.splice($scope.unicorns.indexOf(unicorn), 1);
      })
    };

    $scope.editToggle = function(unicorn){
      if (unicorn.editing) {
        unicorn.unicornName = unicorn.oldUnicornName;
        unicorn.unicornAge = unicorn.oldUnicornAge;
        unicorn.editing = false;
      } else {
        unicorn.oldUnicornName = unicorn.unicornName;
        unicorn.oldUnicornAge = unicorn.unicornAge;
        unicorn.editing = true;
      }
    };
  }]);
};
