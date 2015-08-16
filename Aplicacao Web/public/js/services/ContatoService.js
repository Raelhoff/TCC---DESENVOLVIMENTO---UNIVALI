angular.module('contatooh').factory('DeviceInformation', function($resource) {
	
	return $resource('/product/DeviceDriverArduino/:id');
});