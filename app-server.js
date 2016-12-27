var express = require('express');
var path = require('path');
var _ = require('underscore');
var app = express();

var connections = [];
var audience = [];

var title = 'Untitled Presentation';

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

app.get('*', function (req, res) {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

var server = app.listen(process.env.PORT || 3000, function() {
	console.log('Express Server running on port %s', this.address().port);
});

// Socket.io Setup
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {

	socket.once('disconnect', function () {

		var member = _.findWhere(audience, { id: this.id });
		if (member) {
			audience.splice(audience.indexOf(member), 1);
			io.sockets.emit('audience', audience);
		}

		connections.splice(connections.indexOf(socket), 1);
		socket.disconnect();
	});

	socket.on('join', function (payload) {
		var newMember = {
			id: this.id,
			name: payload.name
		};

		this.emit('joined', newMember);
		audience.push(newMember);
		io.sockets.emit('audience', audience);
	});

	socket.emit('welcome', {
		title: title
	});

	connections.push(socket);
});