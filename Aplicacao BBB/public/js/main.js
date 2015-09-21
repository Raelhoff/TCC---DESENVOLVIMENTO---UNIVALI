angular.module('contatooh',['ngRoute', 'ngResource'])
  .config(function($routeProvider) {
   
    $routeProvider.when('/ultimosdados', {
      templateUrl: 'partials/UltimosDadosClinicos.html',
      controller: 'UltimosDadosClinicosController'
    });

    $routeProvider.when('/LoginController', {
      templateUrl: 'partials/LoginController.html',
      controller: 'LoginController'
    });
    

    $routeProvider.otherwise({redirectTo:'/LoginController'});
});