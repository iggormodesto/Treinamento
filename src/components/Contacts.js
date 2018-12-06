import React from 'react';
import {List} from 'antd';
  //import 'antd/dist/antd.css';
import { Link } from 'react-router-dom'


export default class Contacts extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			contacts: [],
			initLoading:true
		}
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
					pageSize: 3,
				  }}
				renderItem={contact => (
					<List.Item actions={
						[
							//Adicionar o SVG aqui
							<a onClick={this.deleteContact.bind(this, contact)}>
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
		  </React.Fragment>
		);
	}
}

