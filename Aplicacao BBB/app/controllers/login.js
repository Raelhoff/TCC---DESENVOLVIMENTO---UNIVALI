module.exports = function (app) {

  
  var controller = {}


  controller.login = function(req, res) {
      console.log(req.body.username + req.body.password);
      res.redirect('/test');
  };

  return controller;
};