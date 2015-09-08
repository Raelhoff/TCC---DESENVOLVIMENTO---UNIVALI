var http 			       = require('http');
var app 			       = require('./config/express')();
var dgram 			     = require('dgram');
var srv 			       = dgram.createSocket("udp4");
var io 				       = require('socket.io')(http);
var dateFormat       = require('dateformat');
var request          = require('request');
var Constante        = require('./config/constantes'); 

var auxiliar;

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express Server escutando na porta ' + 
              app.get('port'));
});

//GENERAL FUNCTIONS
var getTime = function(){
	return dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss").toString();
}


//Initialize a UDP server to listen for json payloads on port 3333
srv.on("message", function (msg, rinfo) {
  //console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
  // you can specify an entire group with a shallow hash of key/value pairs
  auxiliar = JSON.parse(msg);

  if(auxiliar.temperatura){
    Constante.jsonStringDeviceSensorLM35 = {"device": "LM35","valor":auxiliar.temperatura, "unidade": "°C", "time" : getTime(), "atualiza":"ON"};
  }else
  if(auxiliar.frequencia){
    Constante.jsonStringDevicePulseSensor = {"device": "PulseSensor" ,"valor":  auxiliar.frequencia, "unidade": "BPM", "time" : getTime(), "atualiza":"ON"};
  }
  
});

srv.on("listening", function () {
  var address = srv.address();
  console.log("server UDP " + address.address + ":" + address.port);
});

srv.on('error', function (err) {
//  console.error(err);
 // process.exit(0);
});

srv.bind(8888);


setInterval(function(){ 
  //  Temperatura
    request.post('http://127.0.0.1:3333/Persiste', {
            form:{ id:1 }    
          })
          .on('response', function(response) {
              //console.log(response.statusCode); // 200
   //           res.send("rafa");
          })
          .on('error', function(err) {
//              console.error(err);
     //         res.status(500).json(err);
          })      
        // Envia Temperatura
        request.post('http://127.0.0.1:3333/Persiste', {
            form:{ id:2 }    
          })
          .on('response', function(response) {
              //console.log(response.statusCode); // 200
   //           res.send("rafa");
          })
          .on('error', function(err) {
  //            console.error(err);
     //         res.status(500).json(err);
          }) 

}, 10000);

//var DriverArduinoUDP = require('./config/UDP')();
//var request 		 = require('request');

//var jsonString;

//DriverArduinoUDP.on('message', function (message, remote) {
//	jsonString = JSON.parse(message);
//    //console.log(remote.address + ':' + remote.port +' - ' + message);
    //console.log(jsonString);
//	console.log("Temperatura: "+ jsonString.temperatura + " C°");
//	console.log("Contador: " + jsonString.cont);
//});



