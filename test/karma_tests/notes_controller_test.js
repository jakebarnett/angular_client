'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('unicorns controller', function() {
  var $ControllerConstructor;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('UnicornsApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller){
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller' , function(){
    var UnicornsController = $ControllerConstructor('UnicornsController', {$scope: $scope});
    expect(typeof UnicornsController).toBe('object');
    expect(Array.isArray($scope.unicorns)).toBe(true);
  });

  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should have an getAll function', function() {
      $httpBackend.expectGET('/api/unicorns').respond(200, [{unicornName: 'testy'}]);

      var UnicornsController = $ControllerConstructor('UnicornsController', {$scope: $scope});
      $scope.getAll();
      $httpBackend.flush();

      expect($scope.unicorns[0].unicornName).toBe('testy');
    });


    it('should be able to create a new unicorn', function() {
      $httpBackend.expectPOST('/api/unicorns').respond(200, {_id: 1, unicornName: 'testy'});

      var UnicornsController = $ControllerConstructor('UnicornsController', {$scope: $scope});
      $scope.create({unicornName: 'testy'});
      $httpBackend.flush();

      expect($scope.unicorns[0]._id).toBe(1);
    });

    it('should be able save unicorn changes', function() {
      $httpBackend.expectPUT('/api/unicorns/1').respond(200);

      var UnicornsController = $ControllerConstructor('UnicornsController', {$scope: $scope});
      var unicorn = {unicornName: 'testy', _id: 1, editing: true};
      $scope.save(unicorn);
      $httpBackend.flush();

      expect(unicorn.editing).toBe(false);
    });

    it('should be able to delete a unicorn', function() {
      $httpBackend.expectDELETE('/api/unicorns/1').respond(200);

      $ControllerConstructor('UnicornsController', {$scope: $scope});
      var unicorn = {unicornName: 'testy', _id: 1, editing: true};
      $scope.unicorns.push(unicorn);
      $scope.remove(unicorn);
      $httpBackend.flush();

      expect($scope.unicorns.length).toBe(0);
    });
  });
});
