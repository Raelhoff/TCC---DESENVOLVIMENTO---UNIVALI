///////////////UDP///////////////////////////
//var PORT = 4444;
//var HOST = '127.0.0.1';
//var dgram = require('dgram');
///////////LOCAL///////////////////////////////
//require('shelljs/global');
///////////////TCP//////////////////////////
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var net = require('net');
var EverSocket = require('eversocket').EverSocket;
var dateFormat = require('dateformat');

var SERVER_IP = '192.168.25.4';
var SERVER_PORT = 5555;
var TIMEOUT_FOR_RECONNECT = 3000; //MILLISECONDS
var TIMEOUT_FOR_PING = 8000; //MILLISECONDS

var PING_STATUS = true;

////////////////////////////////////////////

//GENERAL FUNCTIONS
var getTime = function(){
  return dateFormat(new Date(), "yyyy-mm-dd hh:MM:ss").toString();
}
var getClientsQPC = function(){
  var c = [];
  serverQPC.forEach(function(item) {
    c.push(item.name);
  });
  io.emit('clientQPCList', c);
}
var sendMessageForQPC = function(msg){
  serverQPC.forEach(function (cServer) {
    cServer.write(msg);
    });
}

//CLIENT QPC
var clientQPC = new EverSocket({
  reconnectWait: TIMEOUT_FOR_RECONNECT,     // wait 100ms after close event before reconnecting
  timeout: TIMEOUT_FOR_RECONNECT,           // set the idle timeout to 100ms
  reconnectOnTimeout: false,        // reconnect if the connection is idle
  name: SERVER_IP+':'+SERVER_PORT
});

clientQPC.name = SERVER_IP+":"+SERVER_PORT;

clientQPC.connect(SERVER_PORT, SERVER_IP, function(){
  io.emit('console', getTime() + '  -  conectado ao serverQPC: ' + clientQPC.name);
});
clientQPC.on('reconnect', function() {
  io.emit('console', getTime() + '  -  conexão com serverQPC reestabelecida.');
});
clientQPC.on('error', function(e){
  if (e.code == 'ECONNREFUSED') {
    io.emit('console', getTime() + '  -  conexão com serverQPC falhou. tentando novamente em 3 segundos...');
  }
});
clientQPC.on('end', function(){
  io.emit('console', getTime() + '  -  serverQPC encerrou a conexão');  
  io.emit('console', getTime() + '  -  tentando reconexão em 3 segundos...'); 
  clientQPC.end();
});


/////////////////////////////////////////////////

module.exports = function (app) {

  var controller = {}

  controller.Mensagem = function(req, res) {
   // console.log(req.body);
    var message = new Buffer( "Nome: "      + req.body.nome       + 
                              " Email: "    + req.body.email      + 
                              " Mensagem: " + req.body.mensagem);
    console.log(message);
  //////////////////////////////UDP///////////////////////////////////////////////////////  
  //  var client = dgram.createSocket('udp4');
   // client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
    //  if (err) throw err;
      //console.log('UDP message sent to ' + HOST +':'+ PORT);
   //   client.close();
   // });
  ////////////////////////////////TCP//////////////////////////////////////////////////////
    res.send('ok');
    var msg = req.body.nome+req.body.email+req.body.mensagem;
    clientQPC.write(msg);
    io.emit('console', getTime() + '  -  serverQPC enviou ping: ' + msg);
  /////////////////////////////////LOCAL/////////////////////////////////////////////////////
  /*
  var command = "/home/ApEmbarcado/minidisplay-example/minidisplay-test "+req.body.nome+req.body.email+req.body.mensagem;
  
  try {
    echo('Executando comando: '+command);
    exec(command.toString(), function(code, output) {
      if(code===0){
        res.send(200, {message: 'Mensagem enviada com sucesso'});
      }else{
        res.send(401, req.user, {message: 'Ocorreu um erro ao enviar a mensagem'});    
      }
    });
  } catch(e) {
    echo('Error: command "'+command+'" failed\n'+e);
  }
    */
  };

  return controller;
};