import React, { Component } from 'react';
//import { render } from 'react-dom';

class App extends Component {
	constructor(props) {
    	super(props);
  	}
	render() {
    	return (
			<div>
				Hello I am the application - yes! Still working!
				{this.props.children} 
			</div>
		)
	}
}

export default App;

//render(<App/>, document.getElementById('app'));