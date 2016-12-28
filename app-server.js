var express = require('express');
var path = require('path');
var _ = require('underscore');
var app = express();

var connections = [];
var audience = [];
var speaker = {};
var questions = require('./app-questions');
var currentQuestion = false;
var results = {
	a: 0,
	b: 0,
	c: 0,
	d: 0
};

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
			console.log('Member \'%s\' has left', member.name);
		} else if (this.id === speaker.id) {
			console.log('Speaker \'%s\' has left', speaker.name);
			speaker = {};
			title = 'Untitled Presentation';
			io.sockets.emit('end', {title: title, speaker: ''});
		}

		connections.splice(connections.indexOf(socket), 1);
		socket.disconnect();
	});

	socket.on('join', function (payload) {
		var newMember = {
			id: this.id,
			name: payload.name,
			type: 'audience'
		};

		this.emit('joined', newMember);
		audience.push(newMember);
		io.sockets.emit('audience', audience);
	});

	socket.on('start', function (payload) {
		speaker.name = payload.name;
		speaker.id = this.id;
		speaker.type = 'speaker';
		title = payload.title;
		this.emit('joined', speaker);
		io.sockets.emit('start', {title: title, speaker: speaker.name});
	});

	socket.on('ask', function (question) {
		currentQuestion = question;
		results = { a:0, b:0, c:0, d:0 };
		io.sockets.emit('ask', currentQuestion);
		console.log('QUestion asked: %s', currentQuestion.q);
	});

	socket.on('answer', function (payload) {
		results[payload.choice]++;
		console.log('Answer: "%s" - "%j"', payload.choice, results);
	});

	socket.emit('welcome', {
		title: title,
		audience: audience,
		speaker: speaker.name,
		questions: questions,
		currentQuestion: currentQuestion
	});

	connections.push(socket);
});