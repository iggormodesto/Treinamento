import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './css/App.css';

class App extends Component {
	
	render() {
		return (
			<div>
				<Link to="/contacts">login</Link>
			</div>
		);
	}
}

export default (App);