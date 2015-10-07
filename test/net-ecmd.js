module.exports = function (param, cb) {
	var config = {
		host: "127.0.0.1",
		port: 2701,
		timeout: 2000,
		cmds: []
	};

	for (var p in param) {
		config[p] = param[p];
	}

	var net = require('net');
	var conn = net.createConnection(config.port, config.host);
	var errorstate = null;

	conn.setTimeout(config.timeout);
	conn.setEncoding('ascii');

	conn.on('close', function () {
		//console.log(out);
		cb(errorstate,out);
	});
	conn.on('error', function (err) {
		errorstate = err;
	});
	conn.on('timeout', function (err) {
		errorstate = { code: 'ETIMEDOUT', errno: 'ETIMEDOUT', syscall: 'connect' };
		conn.destroy();
	});


	var cmd = config.cmds.shift();
	var out = [];
	var channels = -1;
	var channelArray=[];

	conn.on('connect', function () {
		//console.log("Connected");
		conn.write(cmd + "\n");
		conn.on('data', function (data) {
			//console.log(cmd," => " + data + "\n");

			if (cmd === "channel") {
				if (channels<0) {
					channels = parseInt(data.split(/\n/));
				} 
				if (channels>0){
					channelArray[channels]=parseInt(data);
					channels--;
					conn.write("channel " + channels + "\n");
					return;
				} else {
					channelArray[channels]=parseInt(data);
					channelArray.pop();
					data = channelArray;
					channelArray=[];
					channels = -1;
				}
			} 

			if (typeof data === "string") data = data.trim();
		
			out.push({ 'cmd' : cmd, 'result' : data });
			if ( cmd = config.cmds.shift() ) {
				conn.write(cmd+"\n");
			} else {
				conn.destroy();
			}
		});
	});
}