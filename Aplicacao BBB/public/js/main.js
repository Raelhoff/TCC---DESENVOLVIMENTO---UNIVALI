angular.module('contatooh',['ngRoute', 'ngResource'])
  .config(function($routeProvider) {
   
    $routeProvider.when('/ultimosdados', {
      templateUrl: 'partials/UltimosDadosClinicos.html',
      controller: 'UltimosDadosClinicosController'
    });
        
    $routeProvider.otherwise({redirectTo:'/ultimosdados'});
});