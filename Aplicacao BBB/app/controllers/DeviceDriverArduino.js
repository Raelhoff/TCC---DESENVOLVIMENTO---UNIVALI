var Constante        = require('../../config/constantes'); 
module.exports = function (app) {

  var controller = {}

  controller.DriverArduino = function(req, res) {
      console.log("Rafael Wilmar");
  };

  controller.AtualizaInterface = function(req, res) {
  //  request.get('http://127.0.0.1:3050/message');
      //console.log(req.body);
      //console.log(Constante);
     // console.log("Temperatura: "+ Constante.jsonString.temperatura + " C°");
      //console.log("Contador: " + Constante.jsonString.cont);
      res.json(Constante.jsonStringDeviceArduino);
      //res.send("ssadasdas");
  };

  return controller;
};