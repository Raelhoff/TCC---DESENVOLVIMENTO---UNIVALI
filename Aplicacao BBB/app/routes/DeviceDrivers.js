module.exports = function (app) {
  
  var controller = app.controllers.DeviceDrivers;

  app.route('/arduino')
    .get(controller.AtualizaInterface)
  	.post(controller.AtualizaDispositivo);
};
