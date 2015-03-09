'use strict';

require('angular/angular');

var UnicornsApp = angular.module('UnicornsApp' , []);

require('./unicorns/controllers/unicorns_controller')(UnicornsApp);
