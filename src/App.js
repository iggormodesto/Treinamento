import React, { Component } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickButton } from './actions';


import logo from './logo.svg';
import './App.css';

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