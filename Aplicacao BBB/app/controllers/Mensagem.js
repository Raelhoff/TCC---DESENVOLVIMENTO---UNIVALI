var PORT = 4444;
var HOST = '127.0.0.1';

var dgram = require('dgram');

module.exports = function (app) {

  var controller = {}

  controller.Mensagem = function(req, res) {
    res.send('ok');
   // console.log(req.body);
    var message = new Buffer( "Nome: "      + req.body.nome       + 
                              " Email: "    + req.body.email      + 
                              " Mensagem: " + req.body.mensagem);
    //console.log(message);
    
    var client = dgram.createSocket('udp4');
    client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
      if (err) throw err;
      //console.log('UDP message sent to ' + HOST +':'+ PORT);
      client.close();
    });
    
  };

  return controller;
};