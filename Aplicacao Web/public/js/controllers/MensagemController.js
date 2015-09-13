
angular.module('contatooh').controller('MensagemController',
function($scope, $http) {

var refresh = function() {
  $http.get('/#/mensagem').success(function(response) {
    console.log("I got the data I requested");
    $scope.contato = "";
  });
};


$scope.Enviar = function(contato) {
	console.log(contato);
		
	// Simple POST request example (passing data) :
	$http.post('/msg', contato).
  		then(function(response) {
  			console.log(response);
        $scope.mensagem = {texto: 'Enviado com sucesso!!'};
    			// this callback will be called asynchronously
    			// when the response is available
      			refresh();
  			}, function(response) {
    		    // called asynchronously if an error occurs
    			// or server returns response with an error status.
    			$scope.mensagem = {texto: 'Ocorreu um erro!!'};
    			refresh();
  		});
	}

});	
