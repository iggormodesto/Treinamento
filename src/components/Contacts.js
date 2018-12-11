import React from 'react';
import { Link } from 'react-router-dom'
import {List, Form, Tooltip, Input, Icon, Modal} from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import 'antd/dist/antd.css';

import AddContact from './AddContact';
import FormUpdate from './FormUpdate';

import { connect } from 'react-redux';
//import * as contactAction from '../actions/contactAction';
import { getAllContacts, handleSearch } from '../actions/contactGetAction';
import { deleteContact } from '../actions/contactDeleteAction';

export class Contacts extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			// contacts: [],
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
		this.props.onGetAllContacts();
		
		this.setState({
			initLoading:false});
	}


	deleteContact(contact) {
		const contactIndex = this.props.contacts.list.indexOf(contact);
		this.props.onDeleteContact(contact, contactIndex);
	}

	handleSearch = (event) => {
		var searchQuery = event.target.value.toLowerCase();
		if(searchQuery === ''){
			this.props.onGetAllContacts();
		}else{
			this.props.onHandleSearch(this.props.contacts.list, searchQuery);
		}
	}
	
	render(){
		const contacts = this.props.contacts.list;
		const initLoading = this.state.initLoading;
		console.log(this.props);
		return(
			<React.Fragment>
				<h1 className="title">
					<span>Agenda</span>
					<span>SNEWS</span>
				</h1>
				{
				<Form>
					<FormItem>
						<Input className="search-field" 
							onChange={this.handleSearch} 
							suffix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} 
							placeholder="Busca" />
					</FormItem>
				</Form>
				}
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
							<a onClick={this.showModalDel.bind(this, contact)}>
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
					getContacts={this.props.getContacts}>
				</AddContact>
				<FormUpdate 
					handleCancel={this.handleCancel.bind(this)} 
					visibleModalUpdate={this.state.visibleModalUpdate}
					getContacts={this.props.getContacts} 
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
const mapStateToProps = (state, ownProps) => {
	return {
	  contacts: state.contacts
	}
  };
  
  const mapDispatchToProps = (dispatch) => {
	return {
	  onGetAllContacts: () => dispatch(getAllContacts()),
	  onHandleSearch: (contacts, searchQuery) => dispatch(handleSearch(contacts, searchQuery)),
	  onDeleteContact: (contact, contactIndex) => dispatch(deleteContact(contact, contactIndex))
	  
	}
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Contacts);