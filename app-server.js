var express = require('express');
var app = express();

var connections = [];

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

var server = app.listen(3000);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {

	socket.once('disconnect', function () {
		connections.splice(connections.indexOf(socket), 1);
		socket.disconnect();
		console.log('Socekt Disonnected, %s sockets remaining', connections.length);
	});

	connections.push(socket);
	console.log('Number of sockets connected: %s', connections.length);
});

console.log('Polling app running on port : 3000');