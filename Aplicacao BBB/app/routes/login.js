module.exports = function (app) {
  
  var controller = app.controllers.login;

  app.route('/api/authenticate')
    .post(controller.login);
};
