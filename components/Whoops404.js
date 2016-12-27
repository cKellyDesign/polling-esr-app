import React from 'react';
import { hashHistory, Router, Route, IndexRoute, Link } from 'react-router';

var Whoops404 = React.createClass({
	render() {
		return (
			<div id='not-found'>
				<h1>Whoops, 404 : Page Not Found</h1>
				<p>We cannot find the page you have requested!
				   Were you looking for one of these?</p>

				   <Link to='/'>Join us as an Audience</Link>
				   <Link to='/speaker'>Start a Presentation</Link>
				   <Link to='/board'>View the Board</Link>
			</div>
		);
	}
});

module.exports = Whoops404;