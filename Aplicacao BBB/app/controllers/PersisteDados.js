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
	 console.log(req.body);
   console.log("Enviando dado Persiste banco");
    switch(req.body.id) {
      case '1': // DeviceDriverArduino
          request.post('http://127.0.0.1:9999/product/DeviceDriverArduino', {
            form:{ 
              device: 'DeviceDriverArduino',
              valor1: Constante.jsonStringDeviceArduino.temperatura, 
              valor2: Constante.jsonStringDeviceArduino.cont, 
              data:   getTime() 
            }    
          })
          .on('response', function(response) {
              if(response.statusCode == 201){
                console.log("Salvo com sucesso"); // 200
              }
          })
          .on('error', function(err) {
              console.error(err);
          })      
          break;

      case '2': // Outro Device driver
        
        break;
    

      default: // nao se sabe 
          console.log("Device Driver nao esperado");
  }


    
	}


  return controller;
};

    