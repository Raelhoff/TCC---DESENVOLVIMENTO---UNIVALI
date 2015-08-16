module.exports = function (app) {

  var Device = app.models.DeviceInformation;

  var controller = {}

  controller.listDevices = function(req, res) {
    
    Device.find().exec()
    .then(
      function(devices) {
         res.json(devices); 
         console.log("GET Device");
       },
       function(erro) {
         console.error(erro)
         res.status(500).json(erro);
       } 
    );    
  };
  
  controller.getdevice = function(req, res) {

    var _id = req.params.id;
    Device.findById(_id).exec()
    .then(
      function(devices) {
        if (!devices) throw new Error("Device não encontrado");
          res.json(devices);
          console.log("GET Device ID");     
      }, 
      function(erro) {
        console.log(erro);
        res.status(404).json(erro)
      }
    );    
  };

  controller.removeDevice = function(req, res) { 

    var _id = req.params.id;
    console.log(_id);

    Device.remove({"_id" : _id}).exec()
    .then(
      function() {
        res.send("REMOVE");
        res.end();  
        console.log("REMOVE Device");
      }, 
      function(erro) {
        return console.error(erro);
      }
    );
  };

  controller.saveDevice = function(req, res) {

    console.log(req.body);

    var _id = req.body._id;
   
    if(_id) {
     Device.findByIdAndUpdate(_id, req.body).exec()
     .then(
      function(devices) {
        res.json(devices);
        console.log("POST Device");
      }, 
      function(erro) {
        console.error(erro)
        res.status(500).json(erro);
      }
     );
    } else {
      Device.create(req.body)
      .then(
        function(devices) {
          res.status(201).json(devices);
        }, 
        function(erro) {
          console.log(erro);
          res.status(500).json(erro);
        }
      );
    }
  };

  return controller;
};