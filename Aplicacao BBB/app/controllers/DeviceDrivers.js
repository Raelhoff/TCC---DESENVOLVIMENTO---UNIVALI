var Constante        = require('../../config/constantes'); 
var dateFormat       = require('dateformat');

//GENERAL FUNCTIONS
var getTime = function(){
  return dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss").toString();
}

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

      if(Constante.jsonStringAndroidFreq != undefined){ 
          array.push(Constante.jsonStringAndroidFreq);
      }

     if(Constante.jsonStringAndroidSpovan != undefined){ 
          array.push(Constante.jsonStringAndroidSpovan);
      }

     if(Constante.jsonStringPedometroPassos != undefined){ 
          array.push(Constante.jsonStringPedometroPassos);
      }

     if(Constante.jsonStringPedometroPassosMinutos != undefined){ 
          array.push(Constante.jsonStringPedometroPassosMinutos);
      }

     if(Constante.jsonStringkm != undefined){ 
          array.push(Constante.jsonStringkm);
          console.log(Constante.jsonStringkm);
      }

     if(Constante.AndroidPedometrokmhora != undefined){ 
          array.push(Constante.AndroidPedometrokmhora);
      }

     if(Constante.jsonStringPedometroCalorias != undefined){ 
          array.push(Constante.jsonStringPedometroCalorias);
     }



      //console.log(Constante);
      
     // console.log("Temperatura: "+ Constante.jsonString.temperatura + " C°");
      //console.log("Contador: " + Constante.jsonString.cont);
      //if(Constante.jsonStringDevicePulseSensor != underflow) array.push(Constante.jsonStringDevicePulseSensor);
    // array.push(Constante.jsonStringDevicePulseSensor);
      res.json(array);
      //res.send("ssadasdas");
  };

  controller.AtualizaDispositivo = function(req, res) {
    res.send("ok");
    
    if(req.body.device == "AndroidFrequenciaCardiaca"){
         Constante.jsonStringAndroidFreq = {"device": req.body.device,"valor":  req.body.valor, "unidade": req.body.unidade, "time" : req.body.time, "atualiza":"ON"};
    }else
   if(req.body.device == "Spovan"){
         Constante.jsonStringAndroidSpovan = {"device": req.body.device,"valor":  req.body.valor, "unidade": req.body.unidade, "time" : req.body.time, "atualiza":"ON"};
    }else
    if(req.body.device == "AndroidPedometroPassos"){
         Constante.jsonStringPedometroPassos = {"device": req.body.device,"valor":  req.body.valor, "unidade": req.body.unidade, "time" : req.body.time, "atualiza":"ON"};
    }else
    if(req.body.device == "AndroidPedometroPassosMinutos"){
          Constante.jsonStringPedometroPassosMinutos = {"device": req.body.device,"valor":  req.body.valor, "unidade": req.body.unidade, "time" : req.body.time, "atualiza":"ON"};
    }else
    if(req.body.device == "AndroidPedometrokm"){
         Constante.jsonStringkm = {"device": req.body.device,"valor":  req.body.valor, "unidade": req.body.unidade, "time" : req.body.time, "atualiza":"ON"};
         console.log(Constante.jsonStringkm);
    }else
    if(req.body.device == "AndroidPedometrokmhora"){
         Constante.jsonStringPedometrokmHora = {"device": req.body.device,"valor": req.body.valor, "unidade": req.body.unidade, "time" : req.body.time, "atualiza":"ON"};
    }else
    if(req.body.device == "AndroidPedometroCalorias"){
         Constante.jsonStringPedometroCalorias = {"device": req.body.device,"valor":  req.body.valor, "unidade": req.body.unidade, "time" : req.body.time, "atualiza":"ON"};
    }
  }


  return controller;
};


