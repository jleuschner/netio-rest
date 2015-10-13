module.exports = function (Port) {

	var app;
	Port.getApp(function (err, obj) {
		app = obj;
	});

	// ----------------- iostatus ------------------
	Port.iostatus = function (Id, value, cb) {
		var dataObj = null;
		Port.findById(Id, function (err, selPort) {
			if (err) {
				console.log(err);
				return;
			}
			if (!selPort) {
				console.log("PortId " + Id + "not found!");
				return;
			}
			if (value != undefined && !(value === null)) {
				//console.log(selPort);
				switch (selPort.type) {
					case 'Relay':
						dataObj = { relays: [{ id: selPort.portnumber, value: parseInt(value)}] };
						break;
					case 'PWM':
						dataObj = { pwm: [{ id: selPort.portnumber, value: parseInt(value)}] };
						break;
				}
			}
			app.models.Device.iostatus(selPort.deviceId, dataObj, function (err, result) {
				switch (selPort.type) {
					case 'Relay':
						cb(null, { type: 'Relay', typeTag: selPort.typeTag, value: result.relays[selPort.portnumber] });
						break;
					case 'PWM':
						cb(null, { type: 'PWM', typeTag: selPort.typeTag, value: result.pwm[selPort.portnumber] });
						break;
				}
			});

		});
	};

	Port.remoteMethod(
        'iostatus',
        {
        	http: { path: '/:id/iostatus/', verb: 'post' },
        	accepts: [{ arg: 'id', type: 'string', http: { source: 'path' }, required: true },
										{ arg: 'value', type: 'string', required: false}],
        	returns: { type: 'object', root: true }
        }
    );
	// ----------------- ENDE iostatus --------------


};
