import React, { Component } from 'react';

import axios from 'axios';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickButton } from './actions';

import logo from './logo.svg';
import './App.css';

class App extends Component {
	
  state = {
	contacts: [],
  }
  
  
  componentDidMount() {
    fetch("http://localhost:8080/contacts")
			.then(res => res.json())
			.then(
			data => {
				const contacts = data._embedded.contacts;
				this.setState({ contacts });},
			err => {}
		);
	}
	
	

  
  renderContacts() {
	return this.state.contacts.map(contact =>
		<ul key={contact.name}>{contact.name}</ul>);
  }
 
	
  render() {
	
    return (
      <div className="App" style={{ paddingTop: '10px' }}>
        
		{this.renderContacts()}

      </div>
    );
  }
}

export default (App);