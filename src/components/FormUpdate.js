import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
//import Contacts from './Contacts';
import { Link } from 'react-router-dom'

export default class FormUpdate extends React.Component{
	constructor(props){
		super(props);
		this.state= {
			name:'',
			email:'',
			gender:'',
			birthday:'',
			phone:'',
		}
		
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleGenderChange = this.handleGenderChange.bind(this);
		this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
		this.handlePhoneChange = this.handlePhoneChange.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
	}
	
	handleNameChange = event =>{this.setState({ name: event.target.value })}
	handleEmailChange = event =>{this.setState({ email: event.target.value })}
	handleGenderChange = event =>{this.setState({ gender: event.target.value })}
	handleBirthdayChange = event =>{this.setState({ birthday: event.target.value })}
	handlePhoneChange = event =>{this.setState({ phone: event.target.value })}
	
	componentDidMount(){
		this.setState({
			name:this.props.location.state.contact.name,
			gender:this.props.location.state.contact.gender,
			birthday:this.props.location.state.contact.birthday,
			email:this.props.location.state.contact.email,
			phone:this.props.location.state.contact.phone,
		})
	}
	
	handleUpdate = event => {
		axios.put(this.props.location.state.contact._links.self.href, {name:this.state.name,
		gender: this.state.gender, birthday: this.state.birthday,
		phone: this.state.phone, email: this.state.email})
		.then(res=> {
			console.log(res);
			alert('Contato atualizado');
		 })
		 .catch(function (error) {
			console.log(error);
		  });
	 	event.preventDefault();
	}
	render(){
		const btnMargin={
			marginRight: '10px'
		}
		return(
			<section className="container text-left">
				<form onSubmit={this.handleUpdate}>
					<div className="form-row">
						<div className="form-group col-sm-6">
							<label htmlFor="name">Nome</label>
							<input type="text" className="form-control" name="name" 
							onChange={this.handleNameChange} id="name" value={this.state.name} 
							placeholder="Nome completo"/>
						</div>
						<div className="form-group col-sm-3">
							<label htmlFor="gender">Gênero</label>
							<select id="gender" name="gender" onChange={this.handleGenderChange} 
							className="form-control" required value={this.state.gender}>
							    <option defaultValue value="">Escolha</option>
							    <option value="MALE">Masculino</option>
							    <option value="FEMALE">Feminino</option>
							 </select>
						</div>
						<div className="form-group col-sm-3 ">
							<label htmlFor="birthday">Nascimento</label>
							<input type="date" className="form-control" name="birthday" 
							onChange={this.handleBirthdayChange} id="birthday"
							 placeholder="Data de Aniversário" value={this.state.birthday}/>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-sm-8">
							<label htmlFor="email">Email</label>
							<input type="email" name="email"  onChange={this.handleEmailChange} 
							className="form-control" id="email" 
							placeholder="E-mail" value={this.state.email}/>
						</div>
						<div className="form-group col-sm-4">
							<label htmlFor="phone">Telefone</label>
							<input type="number" className="form-control" name="phone"
							 id="phone" onChange={this.handlePhoneChange}
							placeholder="Telefone" value={this.state.phone} />
						</div>
					</div>
					<div className="text-right">
						<Link to='/contacts' style={btnMargin} className="btn btn-light">Voltar</Link>
						<button type="submit" className="btn btn-primary">Salvar</button>
					</div>
				</form>
			</section>
		)
	}
}

