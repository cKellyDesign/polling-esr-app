var React = require('react');
var ReactDOM = require('react-dom');

var JoinSpeaker = React.createClass({

	start() {
		var speakerName = ReactDOM.findDOMNode(this.refs.name).value;
		var presentationTitle = ReactDOM.findDOMNode(this.refs.title).value;
		this.props.emit('start', { name: speakerName, title: presentationTitle});
	},

	render() {
		return (
			<form action="javascript:void(0)" onSubmit={this.start}>
				<label>Full Name</label>
				<input ref="name"
							 className="form-control"
							 placeholder="enter your full name"
							 required />

				<label>Presentation Title</label>
				<input ref="title"
							 className="form-control"
							 placeholder="enter a presentation title"
							 required />

				<button className="btn btn-primary">Join</button>
			</form>
		);
	}
});

module.exports = JoinSpeaker;