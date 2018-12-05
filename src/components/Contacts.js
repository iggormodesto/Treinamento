import React from 'react';
import reactDOM from 'react-dom';
//import Contact from './models/contact';

import { Link } from 'react-router-dom'


export default class Contacts extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			contacts: [],
		}
	}
  
	componentDidMount() {
		this.getContacts();
	}

	getContacts(){
		fetch("http://192.168.1.180:8080/contacts", {
			method: 'get'
		}).then(res => res.json())
		.then(
			data => {
				const contacts = data._embedded.contacts;
				this.setState({ contacts });
				},
			err => {}
		);
	}

	
	deleteContact(contact) {
		return fetch(contact._links.self.href, {
			method: 'delete'
		}).then(response => {
			this.getContacts();		
		});
	}

	render(){
		return(
			<ul>
			  {this.state.contacts.map(contact =>
				<li key={contact.name}>{contact.name}
					<button onClick={this.deleteContact.bind(this, contact)}>
						Deletar
					</button>
				</li>)
			  }
			  <Link to="/addContac">Adicionar</Link>
			</ul>
		);
	}
}

