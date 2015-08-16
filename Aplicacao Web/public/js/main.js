angular.module('contatooh',['ngRoute', 'ngResource'])
  .config(function($routeProvider) {

    $routeProvider.when('/contatos', {
      templateUrl: 'partials/contatos.html',
      controller: 'ContatosController'
    });

    $routeProvider.when('/contato/:contatoId', {
    	templateUrl: 'partials/contato.html', 
    	controller: 'ContatoController'
    });

    $routeProvider.when('/contato', {
      templateUrl: 'partials/contato.html',
      controller: 'ContatoController'
    });

    $routeProvider.when('/home', {
      templateUrl: 'partials/Home.html',
      controller: 'HomeController'
    });
    
    $routeProvider.when('/mensagem', {
      templateUrl: 'partials/Mensagem.html',
      controller: 'MensagemController'
    });
    
    $routeProvider.when('/ultimosdados', {
      templateUrl: 'partials/UltimosDadosClinicos.html',
      controller: 'UltimosDadosClinicosController'
    });
    
    $routeProvider.when('/historico', {
      templateUrl: 'partials/HistoricoClinico.html',
      controller: 'HistoricoClinicoController'
    });

    $routeProvider.otherwise({redirectTo: '/contatos'});
});