module.exports = function (app) {
  
  var controller = app.controllers.DeviceDriverArduino;

  app.route('/arduino')
    .get(controller.AtualizaInterface);
};
