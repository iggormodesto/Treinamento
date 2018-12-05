import React from 'react';
import reactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Contact from '../models/Contact';

import { Link } from 'react-router-dom'

export default class AddContact extends React.Component{
	constructor(props, Contact){
		super(props);
		this.state = {
			contact: [],
		}
	}


	addContact(){
		console.log('teste');
		fetch("http://192.168.1.180:8080/contacts", {
			method: 'POST',
		    headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		    body: JSON.stringify(this.state.contact)
		}).then(res => res.json())
		.then(
			data => {
				console.log(data);
				//this.props.history.push("/contacts");
			},
			err => {
				console.log(err);
			}
		);
	}

	render(){
		const btnMargin={
			marginRight: '10px'
		}
		return(
			<section className="container text-left">
				<form>
					<div className="form-row">
						<div className="form-group col-sm-6">
							<label htmlFor="name">Nome</label>
							<input type="text" className="form-control" name="name" 
							id="name"  
							placeholder="Nome completo"/>
						</div>
						<div className="form-group col-sm-3">
							<label htmlFor="gender">Gênero</label>
							<select id="gender" name="gender"  
							className="form-control" required >
								<option defaultValue value="">Escolha</option>
								<option value="MALE">Masculino</option>
								<option value="FEMALE">Feminino</option>
							</select>
						</div>
						<div className="form-group col-sm-3 ">
							<label htmlFor="birthday">Nascimento</label>
							<input type="date" className="form-control" name="birthday" 
							 id="birthday"
							placeholder="Data de Aniversário" />
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-sm-8">
							<label htmlFor="email">Email</label>
							<input type="email" name="email"  
							className="form-control" id="email" 
							placeholder="E-mail"/>
						</div>
						<div className="form-group col-sm-4">
							<label htmlFor="phone">Telefone</label>
							<input type="number" className="form-control" name="phone" 
							 id="phone"
							placeholder="Telefone" />
						</div>
					</div>
					<div className="text-right">
						<button style={btnMargin} className="btn btn-light">
							<Link to='/contacts'>
								Voltar
							</Link>
						</button>
						<button onClick={this.addContact.bind(this)} className="btn btn-primary">
							Salvar
						</button>
					</div>
				</form>
			</section>
		)
	}
}

