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
			emit: this.emit
		}
	},

	componentWillMount() {
		this.socket = io(ioAddressString);
		this.socket.on('connect', _.bind(this.connect, this));
		this.socket.on('disconnect', _.bind(this.disconnect, this));
		this.socket.on('welcome', _.bind(this.welcome, this));
		this.socket.on('joined', _.bind(this.joined, this));
		this.socket.on('audience', _.bind(this.updateAudience, this));
	},

	connect() {
		var member = (sessionStorage.member) ? JSON.parse(sessionStorage.member): null;
		
		if (member) {
			this.emit('join', member);
		}

		this.setState({ status: 'connected' });
	},

	disconnect() {
		this.setState({ status: 'disconnected' });
	},

	joined(member) {
		sessionStorage.member = JSON.stringify(member);
		this.setState({ member: member });
	},

	updateAudience(newAudience) {
		this.setState({ audience: newAudience });
	},

	welcome(serverState) {
		this.setState({ title: serverState.title });
	},

	emit(eventName, payload){
		this.socket.emit(eventName, payload);
	},

	render() {
		// var thisState = this.state
		return (
			<div>
				<Header title={this.state.title} status={this.state.status} />
				{ this.props.children && React.cloneElement(this.props.children, this.state) }
			</div>
		);
	}

});

module.exports = App;