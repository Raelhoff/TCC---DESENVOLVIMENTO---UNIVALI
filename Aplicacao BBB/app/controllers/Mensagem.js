module.exports = function (app) {

  var controller = {}

  controller.Mensagem = function(req, res) {
    console.log(req.body);
  };

  return controller;
};