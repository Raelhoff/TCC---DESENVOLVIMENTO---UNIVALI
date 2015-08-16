angular.module('contatooh',['ngRoute', 'ngResource'])
  .config(function($routeProvider) {

    $routeProvider.when('/home', {
      templateUrl: 'partials/Home.html',
      controller: 'HomeController'
    });
        
    $routeProvider.when('/ultimosdados', {
      templateUrl: 'partials/UltimosDadosClinicos.html',
      controller: 'UltimosDadosClinicosController'
    });
        
    $routeProvider.otherwise({redirectTo:'/home'});
});