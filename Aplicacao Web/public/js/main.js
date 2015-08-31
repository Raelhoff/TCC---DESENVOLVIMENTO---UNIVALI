angular.module('contatooh',['ngRoute', 'ngResource'])
  .config(function($routeProvider) {

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

    $routeProvider.otherwise({redirectTo: '#/home'});
});