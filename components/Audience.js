var React = require('react');
var Display = require('./parts/Display');
var Join = require('./parts/Join');
var Ask = require('./parts/Ask');

var Audience = React.createClass({

	render() {
		return (
			<div>
				<Display if={this.props.status === 'connected'}>

					<Display if={this.props.member.name}>

						<Display if={!this.props.currentQuestion}>
							<h2>Welcome {this.props.member.name}</h2>
							<p>{this.props.audience.length} audience members connected</p>
							<p>Questions will be here</p>
						</Display>

						<Display if={this.props.currentQuestion}>
							<Ask emit={this.props.emit} question={this.props.currentQuestion	} />
						</Display>

						
					</Display>

					<Display if={!this.props.member.name}>
						<h1>Join the Session</h1>
						<Join emit={this.props.emit} />
					</Display>

				</Display>
			</div>
		);
	}
});

module.exports = Audience;