import React, { Component } from 'react';

import axios from 'axios';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickButton } from './actions';

import logo from './logo.svg';
import './css/App.css';

class App extends Component {
	
  state = {
	contacts: [],
  }
  
  componentDidMount() {
    fetch("http://192.168.1.180:8080/contacts")
			.then(res => res.json())
			.then(
			data => {
				const contacts = data._embedded.contacts;
				this.setState({ contacts });},
			err => {}
		);
	}
 
  render() {
    return (
      <div className="App" style={{ paddingTop: '10px' }}>

        <ul>
          {this.state.contacts.map(contact =>
            <li key={contact.name}>{contact.name}</li>)
          }
        </ul> 

      </div>
    );
  }
}

export default (App);