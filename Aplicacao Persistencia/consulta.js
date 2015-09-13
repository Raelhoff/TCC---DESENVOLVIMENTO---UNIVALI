var MongoClient = require('mongodb').MongoClient;
var ObjectID    = require('mongodb').ObjectID;

// ObjectID de algum contato existente
var _idProcurado = new ObjectID('53ee689e89bd201218944bba');

MongoClient.connect('mongodb://127.0.0.1:27017/DeviceInformation', 
	function(erro, db) {
		if(erro) throw err;		
		db.collection('Devices').findOne({_id : _idProcurado}, 
			function(erro, device) {
				if(erro) throw err;
				console.log(device);
			}
		);	
	}
);