'use strict';

require('angular/angular');

var UnicornsApp = angular.module('UnicornsApp' , []);

//services
require('./services/resource_service')(UnicornsApp);


//controllers
require('./unicorns/controllers/unicorns_controller')(UnicornsApp);

//directives
