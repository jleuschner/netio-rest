module.exports = function (Device) {
	var netcmd = require("../../modules/netcmd.js");

	// ----------------- ping ------------------
	Device.ping = function (Id, cb) {
		Device.findById(Id, function (err, obj) {
			netcmd({
				host: obj.ip,
				port: 2000,
				cmds: ['version']
			},
				function (error, result) {
					cb(err, result);
				})
		})
		//cb(null, { ping: true })
	};

	Device.remoteMethod(
        'ping',
        {
        	http: { path: '/:id/ping/', verb: 'get' },
        	accepts: [{ arg: 'id', type: 'string', http: { source: 'path' }, required: true}],
        	returns: { type: 'array', root: true }
        }
    );
	// ----------------- ENDE ping --------------

	// ----------------- data ------------------
	Device.data = function (Id, dataObject, cb) {
		var cmd = 'json';
		if (dataObject) cmd += ' ' + JSON.stringify(dataObject);
		Device.findById(Id, function (err, obj) {
			netcmd({
				host: obj.ip,
				port: 2000,
				cmds: Array(cmd)
			},
				function (error, result) {
					if (result.length) {
						cb(err, JSON.parse(result[0].result));
					}
				})
		})
		//cb(null, { ping: true })
	};

	Device.remoteMethod(
        'data',
        {
        	http: { path: '/:id/data/', verb: 'post' },
        	accepts: [{ arg: 'id', type: 'string', http: { source: 'path' }, required: true },
										{ arg: 'dataObject', type: 'object', required: false}],
        	returns: { type: 'object', root: true }
        }
    );
	// ----------------- ENDE command --------------

	// ----------------- commands ------------------
	Device.commands = function (Id, commands, cb) {
		Device.findById(Id, function (err, obj) {
			netcmd({
				host: obj.ip,
				port: 2000,
				cmds: commands
			},
				function (error, result) {
					cb(err, result);
				})
		})
		//cb(null, { ping: true })
	};

	Device.remoteMethod(
        'commands',
        {
        	http: { path: '/:id/commands/', verb: 'post' },
        	accepts: [{ arg: 'id', type: 'string', http: { source: 'path' }, required: true },
										{ arg: 'commands', type: 'array', required: true}],
        	returns: { type: 'array', root: true }
        }
    );
	// ----------------- ENDE commands --------------

};
