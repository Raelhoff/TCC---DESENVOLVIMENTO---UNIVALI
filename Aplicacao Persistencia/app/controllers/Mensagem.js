var request = require('request');

module.exports = function (app) {

  var controller = {}

  controller.Mensagem = function(req, res) {
  //  request.get('http://127.0.0.1:3050/message');
    console.log(req.body)
    request.post('http://192.168.25.101:3333/msg', {
      form:{ nome:req.body.nome, 
             email:req.body.email, 
             mensagem: req.body.mensagem 
           }
    })
    .on('response', function(response) {
        console.log(response.statusCode); // 200
        res.send("OK");
    })
    .on('error', function(err) {
          console.error(err);
         res.status(500).json(err);
    })
  };

  return controller;
};