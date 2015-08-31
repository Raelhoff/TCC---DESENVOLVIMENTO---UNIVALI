var Constante        = require('../../config/constantes'); 
module.exports = function (app) {

  
  var controller = {}

  controller.Driver = function(req, res) {
      console.log("Rafael Wilmar");
  };

  controller.AtualizaInterface = function(req, res) {
  var array = [];
  //  request.get('http://127.0.0.1:3050/message');
      //console.log(req.body);
     // console.log("Rafael");

      if(Constante.jsonStringDevicePulseSensor != undefined){
          //console.log(Constante.jsonStringDevicePulseSensor);
          array.push(Constante.jsonStringDevicePulseSensor);
      }
      if(Constante.jsonStringDeviceSensorLM35 != undefined){
        //console.log(Constante.jsonStringDeviceSensorLM35);
        array.push(Constante.jsonStringDeviceSensorLM35);
      }
      //console.log(Constante);
      
     // console.log("Temperatura: "+ Constante.jsonString.temperatura + " C°");
      //console.log("Contador: " + Constante.jsonString.cont);
      //if(Constante.jsonStringDevicePulseSensor != underflow) array.push(Constante.jsonStringDevicePulseSensor);
    // array.push(Constante.jsonStringDevicePulseSensor);
      res.json(array);
      //res.send("ssadasdas");
  };

  return controller;
};