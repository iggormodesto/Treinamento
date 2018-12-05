import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderPage from './components/HeaderPage';

import './css/App.css';

class App extends Component {
	
	render() {
		return (
			<div>
				<HeaderPage></HeaderPage>
				<section>
					<Link to="/contacts">login</Link>
				</section>
			</div>
		);
	}
}

export default (App);