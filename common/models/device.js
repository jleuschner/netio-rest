module.exports = function (Device) {
	var netcmd = require("../../modules/netcmd.js");

	// ----------------- ping ------------------
	Device.ping = function (Id, cb) {
		/*
		PSCommand.execute("TestConnection", { "computername": Id },
		function (error, result) {
		out = { ping: result.stdout == "true" };
		cb(error, out);
		});
		*/
		Device.findById(Id, function (err, obj) {
			netcmd({
				host: obj.ip,
				port: 2000,
				cmds: ['version']
				},
				function(error,result){
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
        	returns: { type: 'object', root: true }
        }
    );
	// ----------------- ENDE ping --------------


};
