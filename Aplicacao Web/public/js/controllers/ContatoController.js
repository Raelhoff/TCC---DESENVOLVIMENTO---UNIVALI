angular.module('contatooh').controller('ContatoController', 
	function($scope, DeviceInformation, $routeParams) {

		if($routeParams.deviceId) {
			DeviceInformation.get({id: $routeParams.deviceId}, 
				function(device) {
					$scope.contato = device;
				}, 
				function(erro) {
					$scope.mensagem = {
					  texto: 'Contato não existe. Novo contato.'
					};
				}
			);	
		} else {
			$scope.contato = new Contato();
		}


		$scope.salva = function() {
		  console.log("rafael");
		  $scope.contato.$save()
		  	.then(function() {
		  		$scope.mensagem = {texto: 'Salvo com sucesso'};
		  		// limpa o formulário
		  		$scope.contato = new Contato();
		  	})
		  	.catch(function(erro) {
		  		$scope.mensagem = {texto: 'Não foi possível salvar'};
		  	});
		};	

		Contato.query(function(contatos) {
			$scope.contatos = contatos;
    	});	
});