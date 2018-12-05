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
		this.getUsers();
	}

	getUsers(){
		fetch("http://192.168.1.180:8080/contacts")
			.then(res => res.json())
			.then(
			data => {
				const contacts = data._embedded.contacts;
				this.setState({ contacts });
				},
			err => {}
		);
	}

	
	deleteContact(contact) {
		console.log(contact._links.self.href);
		return fetch(contact._links.self.href, {
			method: 'delete'
		}).then(response => {
			this.getUsers();		
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
					<Link to={{pathname: '/updateContac',
					state:{contact: contact}}} >Atualizar</Link>
				</li>)
			  }
			  				<Link to="/addContac">Adicionar</Link>
			</ul>
		);
	}
}

