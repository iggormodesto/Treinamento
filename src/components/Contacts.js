import React from 'react';
import {List} from 'antd';
  //import 'antd/dist/antd.css';
import { Link } from 'react-router-dom'
import { Modal, Button } from 'antd';

import 'antd/dist/antd.css';


export default class Contacts extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			contacts: [],
			initLoading:true,
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
		this.setState({initLoading:false})
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
	handleSearch=(event)=>{
		var searchQuery=event.target.value.toLowerCase();
		var displayedContacts=this.state.contacts.filter(function(el){
		  var searchValue = el.name.toLowerCase();
		  return searchValue.indexOf(searchQuery) !=-1;
		});
		if(searchQuery === ''){
			this.getContacts();
		}else{
			this.setState({
				contacts:displayedContacts
			  });
		}
	}
	render(){
		const contacts = this.state.contacts;
		const initLoading = this.state.initLoading;
		return(
			<React.Fragment>
				<h1 className="title">
					<span>Agenda</span>
					<span>SNEWS</span>
				</h1>
				<input type="text" className="search-field" onChange={this.handleSearch}/>
				<List
				//className="demo-loadmore-list"
				loading={initLoading}
				itemLayout="horizontal"
				dataSource={contacts}
				pagination={{
					onChange: (page) => {
					  console.log(page);
					},
					pageSize: 5,
				  }}
				renderItem={contact => (
					<List.Item actions={
						[
							//Adicionar o SVG aqui
							<a onClick={this.showModal.bind(this, contact)}>
								EXCLUIR
							</a>,
							<Link to={{pathname: '/updateContac',
							state:{contact: contact}}} >EDITAR</Link>, 
						]}>
						<List.Item.Meta
							title={contact.name}
							description={contact.email}
						/>
					</List.Item>
				)}
				/>
		  		<Link to="/addContac">Adicionar</Link>

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
			</React.Fragment>
		);
	}
}