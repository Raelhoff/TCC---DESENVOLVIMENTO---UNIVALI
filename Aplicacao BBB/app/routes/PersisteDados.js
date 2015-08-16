module.exports = function (app) {
  
  var controller = app.controllers.PersisteDados;

  app.route('/confirma')
    .get(controller.confirma)

  app.route('/Persiste')
     .post(controller.Persiste);

};
