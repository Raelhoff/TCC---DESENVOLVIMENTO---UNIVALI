angular.module('contatooh').controller('UltimosDadosClinicosController', 
function($scope, $http, $interval) {
 
//$scope.temperatura = {
  //          texto: '25° C'
//};
 
//$scope.cont = {
  //          texto: '1'
//}; 
$interval(callAtInterval, 3000);

function callAtInterval() {
    refresh();
    console.log("refresh");
}

    
var refresh = function() {
  $http.get('/arduino').then(function(response) {
        $scope.temperatura = {texto: response.data.temperatura + '° C'};
        $scope.cont        = {texto: response.data.cont};
        console.log("atualizou pagina");
           
          // this callback will be called asynchronously
          // when the response is available
        }, function(response) {
            // called asynchronously if an error occurs
          // or server returns response with an error status.
          $scope.temperatura = {texto: 'Ocorreu um erro!!'};
      });
};


  // Simple POST request example (passing data) :
  $http.get('/arduino').
      then(function(response) {
        $scope.temperatura = {texto: response.data.temperatura + '° C'};
        $scope.cont        = {texto: response.data.cont};
           
          // this callback will be called asynchronously
          // when the response is available
        }, function(response) {
            // called asynchronously if an error occurs
          // or server returns response with an error status.
          $scope.temperatura = {texto: 'Ocorreu um erro!!'};
      });

});


