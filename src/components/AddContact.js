import React from 'react';

import { Modal, Button } from 'antd';

import 'bootstrap/dist/css/bootstrap.min.css';
import Contact from '../models/Contact';

import { Link } from 'react-router-dom'

export default class AddContact extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			contact: [],
			visibleModal: true,
		}
		
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	
	handleInputChange = event => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		let contact = Object.assign({}, this.state.contact);
		contact[name] = value;
		this.setState({contact});
	}

	handleCancel = (e) => {
		this.props.history.push("/contacts");
		this.setState({
			visibleModal: false,
		});
	}


	handleSubmit = event => {
		event.preventDefault();
		fetch('http://192.168.1.180:8080/contacts', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
                'Content-Type': 'application/json'
			},
		    body: JSON.stringify(this.state.contact)
		}).then(res => { 	 
			alert('Contato cadastrado');
			this.props.history.push("/contacts");
		});
	}
	
	render(){
		const btnMargin={
			marginRight: '10px'
		}
		return(
			<Modal
				title="ADICIONAR"
				visible={this.state.visibleModal}
				onCancel={this.handleCancel}
				footer={[
					<Link key="back" to='/contacts' style={btnMargin} className="btn btn-light">CANCELAR</Link>,
					<button onClick={this.handleSubmit.bind(this)} key="submit" type="submit" className="btn btn-primary">ADICIONAR</button>
				]}			
			>
				<section className="container text-left">
					<form>
						<div className="form-group col-sm-6">
							<label htmlFor="name">Nome</label>
							<input type="text" className="form-control" name="name" id="name"
							value={this.state.contact.name || ''}
							onChange={this.handleInputChange} 
							placeholder="Nome completo"/>
						</div>
						<div className="form-group col-sm-3">
							<label htmlFor="gender">Gênero</label>
							<select id="gender" name="gender" className="form-control" required
							value={this.state.contact.gender || ''}
							onChange={this.handleInputChange}>
								<option defaultValue value="">Escolha</option>
								<option value="MALE">Masculino</option>
								<option value="FEMALE">Feminino</option>
							</select>
						</div>
						<div className="form-group col-sm-3 ">
							<label htmlFor="birthday">Nascimento</label>
							<input type="date" className="form-control" name="birthday" id="birthday"
							value={this.state.contact.birthday || ''}
							onChange={this.handleInputChange}
							placeholder="Data de Aniversário" />
						</div>
						<div className="form-group col-sm-8">
							<label htmlFor="email">Email</label>
							<input type="email" name="email"  
							className="form-control" id="email" 
							value={this.state.contact.email || ''}
							onChange={this.handleInputChange}
							placeholder="E-mail"/>
						</div>
						<div className="form-group col-sm-4">
							<label htmlFor="phone">Telefone</label>
							<input type="number" className="form-control"
							name="phone" id="phone"
							value={this.state.contact.phone || ''}
							onChange={this.handleInputChange}
							placeholder="Telefone" />
						</div>
					</form>
				</section>
			</Modal>
		)
	}
}

