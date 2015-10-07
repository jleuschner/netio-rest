/*
	netcmd( { parameter } , callback(error,result) );
*/

module.exports = function (param, cb) {
	var config = {
		host: "127.0.0.1",
		port: 23,
		timeout: 2000,
		prompt: ">",
		closecmd: "exit",
		cmds: []
	};

	for (var p in param) {
		config[p] = param[p];
	}
	config.cmds.push(config.closecmd);

	var net = require('net');
	var out = [];
	var errorstate = null;
	var curdata = "";

	var conn = net.createConnection(config.port, config.host);
	var i = 0;
	conn.setEncoding('ascii');
	conn.setTimeout(config.timeout);
	conn.on('close', function () {
		cb(errorstate, out);
	})
	conn.on('error', function (err) {
		errorstate = err;
	})
	conn.on('timeout', function (err) {
		errorstate = { code: 'ETIMEDOUT', errno: 'ETIMEDOUT', syscall: 'connect' };
		conn.destroy();
	})


	conn.on('connect', function () {
		conn.on('login', function () {
			conn.write('myUsername\n');
		});
		conn.on('password', function () {
			conn.write('myPassword\n');
		});
		conn.on('prompt', function () {
			if (i > 0) {
				out.push({
					'cmd': config.cmds[i-1],
					'result': curdata
				});
				curdata = "";
			}
			if (i < config.cmds.length) {
				conn.write(config.cmds[i]);
				i++;
			}
		});
		conn.on('data', function (data) {
			if (data.indexOf("login") != -1) {
				conn.emit('login');
				return;
			}
			if (data.indexOf("password") != -1) {
				conn.emit('password');
				return;
			}
			data.split(/\n/).forEach(function (line) {
				if (line.indexOf(config.prompt) != -1) {
					conn.emit('prompt');
					return;
				}
				curdata += line+"\n";
			})
		});
	});

}