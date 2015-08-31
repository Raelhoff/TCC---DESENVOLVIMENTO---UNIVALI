angular.module('contatooh').controller('HistoricoClinicoController', 
  function(DeviceInformation, $scope) { 
    $scope.devices = [];

    $scope.filtro = '';

    $scope.mensagem = {texto: ''};
  
    function buscaDevice() {
      DeviceInformation.query(
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

    $scope.remove = function(device) {
      DeviceInformation.delete({id: device._id}, 
        buscaDevice, 
        function(erro) {
          $scope.mensagem = {
            texto: 'Não foi possível remover o dispositivo'
          };
          console.log(erro);
        }
      );
    }; 
});
