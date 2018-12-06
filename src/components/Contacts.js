import React from 'react';

import { Link } from 'react-router-dom'
import { Modal, Button } from 'antd';

import 'antd/dist/antd.css';


export default class Contacts extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			contacts: [],
			contactToDel: [],
			visibleModal: false,
		}
	}
	
	showModal = (contact) => {
	this.setState({contactToDel: contact})
		this.setState({
			visibleModal: true,
		});
	}

	handleOk = (e) => {
		this.deleteContact(this.state.contactToDel);
		console.log(e);
		this.setState({
			visibleModal: false,
		});
	}

	handleCancel = (e) => {
		console.log(e);
		this.setState({
			visibleModal: false,
		});
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
			<div>
				<ul>
				  {this.state.contacts.map(contact =>
					<li key={contact.name}>{contact.name}
						
						<Button type="primary" onClick={this.showModal.bind(this, contact)}>
							Deletar
						</Button>
						
						
						<Link to={{pathname: '/updateContac',
						state:{contact: contact}}} >Atualizar</Link>
					</li>)
				  }
				  <Link to="/addContac">Adicionar</Link>
				</ul>

				
				<Modal
					title="Tem certeza que deseja excluir?"
					visible={this.state.visibleModal}
					onCancel={this.handleCancel}

					footer={[
						<Button key="back" onClick={this.handleCancel.bind(this)}>Não</Button>,
						<Button key="submit" onClick={this.handleOk.bind(this)}>Sim</Button>,
					]}					
				>
				</Modal>
			</div>			
		);
	}
}