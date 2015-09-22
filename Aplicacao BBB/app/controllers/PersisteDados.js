var Constante        = require('../../config/constantes'); 
var request 		     = require('request');
var dateFormat       = require('dateformat');

//GENERAL FUNCTIONS
var getTime = function(){
	return dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss").toString();
}


module.exports = function (app) {

  var controller = {}

  controller.confirma = function(req, res) {
    console.log(req.body);
    res.send("chegou");
  };

  controller.Persiste = function(req,res){
	 //console.log(req.body);
   //console.log("Enviando dado Persiste banco");
   res.send("Ok");

    switch(req.body.id) {
      case '1': // DeviceDriverArduino
          if(Constante.jsonStringDevicePulseSensor != undefined){
     //     console.log("Rafa");
       //   console.log(Constante.jsonStringDevicePulseSensor);

            if(Constante.jsonStringDevicePulseSensor.atualiza == "ON"){
              
              Constante.jsonStringDevicePulseSensor.atualiza = "OFF";
              request.post('http://192.168.25.100:9999/product/DeviceDriver', {
                form:{"device"  : Constante.jsonStringDevicePulseSensor.device,
                      "valor"   : Constante.jsonStringDevicePulseSensor.valor,
                      "unidade" : Constante.jsonStringDevicePulseSensor.unidade,
                      "time"    : Constante.jsonStringDevicePulseSensor.time
                      }    
              })
              .on('response', function(response) {
                if(response.statusCode == 201){
                  console.log("Salvo com sucesso PulseSensor "); // 200
                }
              })
              .on('error', function(err) {
                console.error(err);
              }) 
            }    
          } 
          break;

      case '2': // DeviceDriverArduino
          if(Constante.jsonStringDeviceSensorLM35 != undefined ){ 
            if(Constante.jsonStringDeviceSensorLM35.atualiza == "ON"){
            Constante.jsonStringDeviceSensorLM35.atualiza = "OFF";
            request.post('http://192.168.25.100:9999/product/DeviceDriver', {
                form:{"device"  : Constante.jsonStringDeviceSensorLM35.device,
                      "valor"   : Constante.jsonStringDeviceSensorLM35.valor,
                      "unidade" : Constante.jsonStringDeviceSensorLM35.unidade,
                      "time"    : Constante.jsonStringDeviceSensorLM35.time  
                      } 
            })
            .on('response', function(response) {
              if(response.statusCode == 201){
                console.log("Salvo com sucesso SensorLM35 "); // 200
              }
            })
            .on('error', function(err) {
              console.error(err);
            })
          } 
          }     
          break;

          case '3': // DeviceDriverArduino
          if(Constante.jsonStringAndroidFreq != undefined ){ 
            if(Constante.jsonStringAndroidFreq.atualiza == "ON"){
            Constante.jsonStringAndroidFreq.atualiza = "OFF";
            request.post('http://192.168.25.100:9999/product/DeviceDriver', {
                form:{"device"  : Constante.jsonStringAndroidFreq.device,
                      "valor"   : Constante.jsonStringAndroidFreq.valor,
                      "unidade" : Constante.jsonStringAndroidFreq.unidade,
                      "time"    : Constante.jsonStringAndroidFreq.time  
                      } 
            })
            .on('response', function(response) {
              if(response.statusCode == 201){
                console.log("Salvo com sucesso AndroidFreq"); // 200
              }
            })
            .on('error', function(err) {
              console.error(err);
            })
          } 
          }     
          break;

          case '4': // DeviceDriverArduino
          if(Constante.jsonStringAndroidSpovan != undefined ){ 
            if(Constante.jsonStringAndroidSpovan.atualiza == "ON"){
            Constante.jsonStringAndroidSpovan.atualiza = "OFF";
            request.post('http://192.168.25.100:9999/product/DeviceDriver', {
                form:{"device"  : Constante.jsonStringAndroidSpovan.device,
                      "valor"   : Constante.jsonStringAndroidSpovan.valor,
                      "unidade" : Constante.jsonStringAndroidSpovan.unidade,
                      "time"    : Constante.jsonStringAndroidSpovan.time  
                      } 
            })
            .on('response', function(response) {
              if(response.statusCode == 201){
                console.log("Salvo com sucesso Spovan"); // 200
              }
            })
            .on('error', function(err) {
              console.error(err);
            })
          } 
          }     
          break;

          case '5': // DeviceDriverArduino

          if(Constante.jsonStringPedometroPassos != undefined ){ 
            if(Constante.jsonStringPedometroPassos.atualiza == "ON"){
             Constante.jsonStringPedometroPassos.atualiza = "OFF";
            request.post('http://192.168.25.100:9999/product/DeviceDriver', {
                form:{"device"  : Constante.jsonStringPedometroPassos.device,
                      "valor"   : Constante.jsonStringPedometroPassos.valor,
                      "unidade" : Constante.jsonStringPedometroPassos.unidade,
                      "time"    : Constante.jsonStringPedometroPassos.time  
                      } 
            })
            .on('response', function(response) {
              if(response.statusCode == 201){
                 console.log("Salvo com sucesso PedometroPassos"); // 200
              }
            })
            .on('error', function(err) {
              console.error(err);
            })
          } 
          }     
          break;

          case '6': // DeviceDriverArduino
                 
          if(Constante.jsonStringkm != undefined ){ 
            if(Constante.jsonStringkm.atualiza == "ON"){
            Constante.jsonStringkm.atualiza = "OFF";
            request.post('http://192.168.25.100:9999/product/DeviceDriver', {
                form:{"device"  : Constante.jsonStringkm.device,
                      "valor"   : Constante.jsonStringkm.valor,
                      "unidade" : Constante.jsonStringkm.unidade,
                      "time"    : Constante.jsonStringkm.time  
                      } 
            })
            .on('response', function(response) {
              if(response.statusCode == 201){
                console.log("Salvo com sucesso Pedometrokm"); // 200
              }
            })
            .on('error', function(err) {
              console.error(err);
            })
          } 
          }     
          break;

          case '7': // DeviceDriverArduino
          if(Constante.jsonStringPedometroPassosMinutos != undefined ){ 
            if(Constante.jsonStringPedometroPassosMinutos.atualiza == "ON"){
            Constante.jsonStringPedometroPassosMinutos.atualiza = "OFF";
            request.post('http://192.168.25.100:9999/product/DeviceDriver', {
                form:{"device"  : Constante.jsonStringPedometroPassosMinutos.device,
                      "valor"   : Constante.jsonStringPedometroPassosMinutos.valor,
                      "unidade" : Constante.jsonStringPedometroPassosMinutos.unidade,
                      "time"    : Constante.jsonStringPedometroPassosMinutos.time  
                      } 
            })
            .on('response', function(response) {
              if(response.statusCode == 201){
                console.log("Salvo com sucesso PassosMinutos " ); // 200
              }
            })
            .on('error', function(err) {
              console.error(err);
            })
          } 
          }     
          break;

          case '8': // DeviceDriverArduino
          if(Constante.jsonStringPedometrokmHora != undefined ){ 
            if(Constante.jsonStringPedometrokmHora.atualiza == "ON"){
            Constante.jsonStringPedometrokmHora.atualiza = "OFF";
            request.post('http://192.168.25.100:9999/product/DeviceDriver', {
                form:{"device"  : Constante.jsonStringPedometrokmHora.device,
                      "valor"   : Constante.jsonStringPedometrokmHora.valor,
                      "unidade" : Constante.jsonStringPedometrokmHora.unidade,
                      "time"    : Constante.jsonStringPedometrokmHora.time  
                      } 
            })
            .on('response', function(response) {
              if(response.statusCode == 201){
                console.log("Salvo com sucesso PedometrokmHora "); // 200
              }
            })
            .on('error', function(err) {
              console.error(err);
            })
          } 
          }     
          break;

          case '9': // DeviceDriverArduino
          if(Constante.jsonStringPedometroCalorias != undefined ){ 
            if(Constante.jsonStringPedometroCalorias.atualiza == "ON"){
            Constante.jsonStringPedometroCalorias.atualiza = "OFF";
            request.post('http://192.168.25.100:9999/product/DeviceDriver', {
                form:{"device"  : Constante.jsonStringPedometroCalorias.device,
                      "valor"   : Constante.jsonStringPedometroCalorias.valor,
                      "unidade" : Constante.jsonStringPedometroCalorias.unidade,
                      "time"    : Constante.jsonStringPedometroCalorias.time  
                      } 
            })
            .on('response', function(response) {
              if(response.statusCode == 201){
                console.log("Salvo com sucesso PedometroCalorias"); // 200
              }
            })
            .on('error', function(err) {
              console.error(err);
            })
          } 
          }     
          break;

      default: // nao se sabe 
          console.log("Device Driver nao esperado");
  }


    
	}


  return controller;
};

    