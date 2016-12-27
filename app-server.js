var express = require('express');
var app = express();

var connections = [];

var title = 'Untitled Presentation';

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

var server = app.listen(process.env.PORT || 3000, function() {
	console.log('Express Server running on port %s', this.address().port);
});

// Socket.io Setup
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {

	socket.once('disconnect', function () {
		connections.splice(connections.indexOf(socket), 1);
		socket.disconnect();
		console.log('Socekt Disonnected, %s sockets remaining', connections.length);
	});

	socket.emit('welcome', {
		title: title
	});

	connections.push(socket);
	console.log('Number of sockets connected: %s', connections.length);
});