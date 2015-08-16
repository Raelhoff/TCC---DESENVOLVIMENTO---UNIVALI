module.exports = function (app) {
  
  var controller = app.controllers.Mensagem;

  app.route('/msg')
    .post(controller.Mensagem);
};
