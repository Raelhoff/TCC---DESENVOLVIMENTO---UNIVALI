angular.module('contatooh').factory('DeviceInformation', function($resource) {
	
	return $resource('/product/DeviceDriver/');
});