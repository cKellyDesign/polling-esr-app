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
			dance: 'hell ya'
		}
	},

	componentWillMount() {
		this.socket = io(ioAddressString);
		this.socket.on('connect', _.bind(this.connect, this));
		this.socket.on('connect', _.bind(this.connect, this));
		this.socket.on('welcome', _.bind(this.welcome, this));
	},

	connect() {
		this.setState({ status: 'connected' });
	},

	disconnect() {
		this.setState({ status: 'disconnected' });
	},

	welcome(serverState) {
		this.setState({ title: serverState.title });
	},

	render() {
		return (
			<div>
				<Header title={this.state.title} status={this.state.status} />
				{ this.props.children && React.cloneElement(this.props.children, this.state) }
			</div>
		);
	}

});

module.exports = App;