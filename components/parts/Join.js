var React = require('react');
var ReactDOM = require('react-dom');
import { Link } from 'react-router';

var Join = React.createClass({

	join() {
		var memberName = ReactDOM.findDOMNode(this.refs.name).value;
		this.props.emit('join', { name: memberName });
	},

	render() {
		return (
			<form action="javascript:void(0)" onSubmit={this.join}>
				<label>Full Name</label>
				<input ref="name"
							 className="form-control"
							 placeholder="enter your full name"
							 required />

				<button className="btn btn-primary">Join</button>
				<Link to="/speaker">Join as spaker</Link>
			</form>
		);
	}
});

module.exports = Join;