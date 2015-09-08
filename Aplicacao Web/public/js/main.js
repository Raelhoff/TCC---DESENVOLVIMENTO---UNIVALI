angular.module('contatooh',['ngRoute', 'ngResource'])
  .config(function($routeProvider) {

  
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

    $routeProvider.when('/LoginController', {
      templateUrl: 'partials/LoginController.html',
      controller: 'LoginController'
    });
    

    $routeProvider.otherwise({redirectTo:'/LoginController'});
});