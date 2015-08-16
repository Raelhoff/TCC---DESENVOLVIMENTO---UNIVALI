module.exports = function (app) {
	
  var controller = app.controllers.DeviceInformation;

  app.route('/product/DeviceDriverArduino')
  	.get(controller.listDevices)
  	.post(controller.saveDevice)

  app.route('/product/DeviceDriverArduino/:id')
	.get(controller.getdevice)
	.delete(controller.removeDevice);
};
