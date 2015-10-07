var netcmd = require('./netcmd');
var netio = require('./net-ecmd');

netio({ 
	host: '192.168.0.70',
	cmds: ['version','channel'] 
	}
	, function (error,result) {
			console.log("NetIO: ",error,result);
		}	
);
netio({ 
	host: '192.168.0.80',
	cmds: ['version','channel'] 
	}
	, function (error,result) {
			console.log("NetIO2: ",error,result);
		}	
);

netcmd({ 
	host: '192.168.0.72',
	port: 2000,
	cmds: ['version','pwm'] 
	}
	, function (error,result) {
			console.log("PIO: ",error,result);
		}	
);



/*
var net = require('net');
var conn = net.createConnection(2000, '192.168.0.72');
var commands = [ "exit\n" ];
var i = 0;
conn.setEncoding('ascii');
conn.on('connect', function() {
    conn.on('login', function () {
        conn.write('myUsername\n');
    });
    conn.on('password', function () {
        conn.write('myPassword\n');
    });
    conn.on('prompt', function () {
        conn.write(commands[i]);
        i++;
    });
    conn.on('data', function(data) {
        console.log("got: " + data + "\n");
        if (data.indexOf("login") != -1) {
            conn.emit('login');
        }
        if (data.indexOf("password") != -1) {
            conn.emit('password');
        }
        if (data.indexOf(">") != -1) {
            conn.emit('prompt');
        }
    });
});
*/



/*
var net = require('net');
var client = new net.Socket();
client.connect(2000, '192.168.0.72', function() {
	console.log('Connecting');
});

client.on('connect', function() {
	console.log('Connected');
	client.write('version');
});

client.on('data', function(data) {
	//console.log("Get data: ",data.toString(),( parseInt(data.toString().indexOf(">")) < 0) );
	if ( parseInt(data.toString().indexOf(">")) < 0) {
		console.log("Get Response: ",data.toString() );
		client.write('exit');
	}
	
	//client.destroy(); // kill client after server's response
});

client.on('error', function (error) {
	console.log(error);
})

client.on('close', function() {
	console.log('Connection closed');
});

*/