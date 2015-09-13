module.exports = function (app) {
	
  var controller = app.controllers.DeviceInformation;

  app.route('/product/DeviceDriver')
  	.get(controller.listDevices)
  	.post(controller.saveDevice)

  app.route('/product/DeviceDriver/:id')
	.get(controller.getdevice)
	.delete(controller.removeDevice);
};
