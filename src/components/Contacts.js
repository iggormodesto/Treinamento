import React from 'react';
import { Link } from 'react-router-dom'
import {List, Form, Tooltip, Input, Icon, Modal} from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import 'antd/dist/antd.css';

import AddContact from './AddContact';
import FormUpdate from './FormUpdate';

export default class Contacts extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			contacts: [],
			initLoading:true,
			contactToDel: [],
			contactToUpdate: [],
			visibleModal: false,
			visibleModalAdd: false,
			visibleModalUpdate: false,
		}
	}

	showModalUpdate = (contact) =>  {
		this.setState({
			visibleModalUpdate: true,
			contactToUpdate: contact,
		});
	}

	showModalAdd() {
		this.setState({
			visibleModalAdd: true,
		});
	}
	
	showModalDel = (contact) => {
		this.setState({
			contactToDel: contact,
			visibleModal: true,
		});
	}

	handleOk = (e) => {
		this.deleteContact(this.state.contactToDel);
		this.setState({
			visibleModal: false,
		});
	}

	handleCancel = (e) => {
		this.setState({
			visibleModal: false,
			visibleModalAdd: false,
			visibleModalUpdate: false
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
				contacts.map((contact) => {
					if(contact.gender === null){
						contact.gender = '';
					}
					if(contact.birthday === null){
						contact.birthday = '';
					}
				})
				this.setState({ contacts });
				},
			err => {
				console.log(err);
			}

		);
	}

	deleteContact(contact) {
		fetch(contact._links.self.href, {
			method: 'delete'
		}).then(response => {
			this.getContacts();		
		});
	}

	handleSearch=(event)=>{
		var searchQuery=event.target.value.toLowerCase();
		var displayedContacts=this.state.contacts.filter(function(el){
		  var searchValue = el.name.toLowerCase();
		  return searchValue.indexOf(searchQuery) !==-1;
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

				<Form>
					<FormItem>
						<Input className="search-field" 
							onChange={this.handleSearch} 
							suffix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} 
							placeholder="Busca" />
					</FormItem>
				</Form>

				<List
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
							<a href="#" onClick={this.showModalDel.bind(this, contact)}>
								<Icon type="delete" />
								EXCLUIR
							</a>,
							<a onClick={this.showModalUpdate.bind(this, contact)}>
								<Icon type="edit" />
								EDITAR
							</a>, 
						]}>
						<Tooltip placement="rightBottom" title={contact.gender + ' | ' + contact.birthday}>
							<ul>
								<li><h6>{contact.name}</h6></li>
								<li>
									<Icon type="mail" />
									<p>{contact.email}</p>
								</li>
								<li>
									<Icon type="phone" />
									<p>{contact.phone}</p>
								</li>
							</ul>
						</Tooltip>
					</List.Item>
				)}
				/>
		  		<button onClick={this.showModalAdd.bind(this)} className="btn-add">
				  <Icon type="plus" />
				  Adicionar Contato
				</button>

				<AddContact 
					handleCancel={this.handleCancel.bind(this)} 
					visibleModalAdd={this.state.visibleModalAdd}
					getContacts={this.getContacts.bind(this)}>
				</AddContact>
				<FormUpdate 
					handleCancel={this.handleCancel.bind(this)} 
					visibleModalUpdate={this.state.visibleModalUpdate}
					getContacts={this.getContacts.bind(this)} 
					contact={this.state.contactToUpdate} >
				</FormUpdate>

				<Modal
					//title="Tem certeza que deseja excluir?"
					visible={this.state.visibleModal}
					onCancel={this.handleCancel}
					
					footer={[
						<Link key="submit" to='#' onClick={this.handleOk.bind(this)}>Sim</Link>,
						<button key="back" onClick={this.handleCancel.bind(this)} type="submit" className="btn ant-btn-primary">Não</button>
					]}
					>
					<h2>Tem certeza que deseja excluir?</h2>
				</Modal>
			</React.Fragment>
		);
	}
}