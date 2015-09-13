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
         //         console.log("Salvo com sucesso"); // 200
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
           //     console.log("Salvo com sucesso"); // 200
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

    