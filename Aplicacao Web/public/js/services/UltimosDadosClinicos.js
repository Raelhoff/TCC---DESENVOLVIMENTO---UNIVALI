angular.module('contatooh').factory('DeviceInformationAtual', function($resource) {  

		return $resource('/product/DeviceDriverUpdated/');	
});

