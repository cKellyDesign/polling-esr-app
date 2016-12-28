import React from 'react';
import io from 'socket.io-client';
import _ from 'underscore';

import Header from './parts/Header';

var ioAddressString = window.location.href.indexOf('localhost') !== -1 ? 'http://localhost:3000' : 'http://polling-esr-app.herokuapp.com/';

var App = React.createClass({

	getInitialState() {
		return {
			status: 'disconnected',
			title: '',
			member: {},
			audience: [],
			speaker: '',
			questions: [],
			currentQuestion: false,
			results : {},
			emit: this.emit
		}
	},

	componentWillMount() {
		this.socket = io(ioAddressString);
		this.socket.on('connect', _.bind(this.connect, this));
		this.socket.on('disconnect', _.bind(this.disconnect, this));
		this.socket.on('welcome', _.bind(this.updateState, this));
		this.socket.on('joined', _.bind(this.joined, this));
		this.socket.on('audience', _.bind(this.updateAudience, this));
		this.socket.on('start', _.bind(this.start, this));
		this.socket.on('end', _.bind(this.updateState, this));
		this.socket.on('ask', _.bind(this.ask, this));
		this.socket.on('results', _.bind(this.updateResults, this));
	},

	connect() {
		var member = (sessionStorage.member) ? JSON.parse(sessionStorage.member): null;
		
		if (member && member.type === 'audience') {
			this.emit('join', member);
		} else if (member && member.type === 'speaker') {
			this.emit('start', { name: member.name, title: sessionStorage.title });
		}

		this.setState({ status: 'connected' });
	},

	disconnect() {
		this.setState({
			status: 'disconnected',
			title: 'disconnected',
			speaker: ''
		});
	},

	joined(member) {
		sessionStorage.member = JSON.stringify(member);
		this.setState({ member: member });
	},

	updateAudience(newAudience) {
		this.setState({ audience: newAudience });
	},

	start(presentation){
		if (this.state.member.type === 'speaker') {
			sessionStorage.title = presentation.title;
		}
		this.setState(presentation);
	},

	updateState(serverState) {
		console.log('ServerState: ', serverState);
		this.setState(serverState);
	},

	emit(eventName, payload){
		this.socket.emit(eventName, payload);
	},

	ask(question) {
		sessionStorage.answer = '';
		this.setState({ currentQuestion: question });
	},

	updateResults(data) {
		this.setState({ results : data });
	},

	render() {
		// var thisState = this.state
		return (
			<div>
				<Header {...this.state} />
				{ this.props.children && React.cloneElement(this.props.children, this.state) }
			</div>
		);
	}

});

module.exports = App;