import React from 'react';
import { render } from 'react-dom';
import { hashHistory, Router, Route, IndexRoute, Link } from 'react-router';

// React Import
// var React = require('react');
// var ReactDOM = require('react-dom');

// // react-router Import
// var Router = require('react-router').Router,
// 		Route = require('react-router').Route,
// 		Link = require('react-router').Link,
// 		IndexRoute = require('react-router').IndexRoute,
// 		hashHistory = require('react-router').hashHistory;

// Components Import
var APP = require('./components/APP');
var Audience = require('./components/Audience');
var Board = require('./components/Board');
var Speaker = require('./components/Speaker');
var Whoops404 = require('./components/Whoops404');

// Route Setup
var routes = (
	<Router history={hashHistory}>
		<Route path="/" component={APP}>
			<IndexRoute component={Audience} />
		  <Route path="speaker" component={Speaker} />
		  <Route path="board" component={Board} />
		  <Route path="*" status={404} component={Whoops404} />
  	</Route>
	</Router>
);

// Render
render(routes, document.getElementById('react-container'));