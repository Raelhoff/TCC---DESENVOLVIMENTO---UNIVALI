angular.module('contatooh').controller('UltimosDadosClinicosController', 
    function(DeviceInformationAtual, $scope) { 
    $scope.devices = [];

    $scope.filtro = '';

    $scope.mensagem = {texto: ''};
  
    function buscaDevice() {
      console.log("Entro");
      DeviceInformationAtual.query(
        function(devices) {
          $scope.devices = devices;
          $scope.mensagem = {};
        },
        function(erro) {
          console.log(erro);
          $scope.mensagem = {
            texto: 'Não foi possível obter a lista'
          };
        }
      ); 
    }

    buscaDevice();
 
});

