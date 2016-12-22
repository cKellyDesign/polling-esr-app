import React from 'react';
import io from 'socket.io-client';
import _ from 'underscore';

import Header from './parts/Header';

var ioAddressString = window.location.href.indexOf('localhost') !== -1 ? 'http://localhost:3000' : 'http://polling-esr-app.herokuapp.com/';

var App = React.createClass({

	getInitialState() {
		return {
			status: 'disconnected'
		}
	},

	componentWillMount() {
		this.socket = io(ioAddressString);
		this.socket.on('connect', _.bind(this.connect, this));
		this.socket.on('disconnect', _.bind(this.disconnect, this));
	},

	connect() {
		this.setState({ status: 'connected' });
	},

	disconnect() {
		this.setState({ status: 'disconnected' });
	},

	render() {
		return <div><Header title="New Header" status={this.state.status} /></div>;
	}

});

module.exports = App;