var mongoose = require('mongoose');

module.exports = function() {
  var schema = mongoose.Schema({
    device: { 
      type: String, 
      required: true
    }, 
    valor: {
      type: Number, 
      required: true 
    }, 
    unidade: {
      type: String, 
      required: true 
    },
    time: { 
      type: String, 
      required: true
    }
  });

  return mongoose.model('Devices', schema);
};