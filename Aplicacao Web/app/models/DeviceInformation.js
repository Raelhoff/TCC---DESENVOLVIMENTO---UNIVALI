var mongoose = require('mongoose');

module.exports = function() {
  var schema = mongoose.Schema({
    device: { 
      type: String, 
      required: true
    }, 
    valor1: {
      type: Number, 
      required: true 
    }, 
    valor2: {
      type: Number, 
      required: true 
    },
    data: { 
      type: String, 
      required: true
    }
  });

  return mongoose.model('Devices', schema);
};