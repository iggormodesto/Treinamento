import React from 'react';
import { Link } from 'react-router-dom'
import { Modal } from 'antd';

export default class FormUpdate extends React.Component{
	constructor(props){
		super(props);
		this.state= {
			contact:[],
			visibleModal: true,
		}
		this.handleUpdate = this.handleUpdate.bind(this);
	}
	handleInputChange = event => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		let contact = Object.assign({}, this.state.contact);
		contact[name] = value;
		this.setState({contact});
	}
	
	componentDidMount(){
		this.setState({
			contact: this.props.location.state.contact
		})
	}

	handleCancel = (e) => {
		this.props.history.push("/contacts");
		this.setState({
			visibleModal: false,
		});
	}
	
	handleUpdate = event => {
		fetch(this.props.location.state.contact._links.self.href, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
                'Content-Type': 'application/json'
			},
		    body: JSON.stringify(this.state.contact)
		}).then(res=> {
			this.props.history.push("/contacts");
			alert('Contato atualizado');
		 })
		 .catch(function (error) {
			console.log(error);
		  });
	 	event.preventDefault();
	}
	render(){
		return(
			<Modal
				title="Editar"
				visible={this.state.visibleModal}
				onCancel={this.handleCancel}
				footer={[
					<Link key="back" to='/contacts'>Cancelar</Link>,
					<button key="submit" onClick={this.handleUpdate.bind(this)} type="submit" className="btn ant-btn-primary">Atualizar</button>
				]}
			>
				<section className="container text-left">
					<form>
						<div className="form-group">
							<label htmlFor="name">Nome</label>
							<input type="text" className="form-control" name="name" 
							onChange={this.handleInputChange} id="name" value={this.state.contact.name || ''} 
							placeholder="Nome completo"/>
						</div>
						<div className="form-group">
							<label htmlFor="gender">Gênero</label>
							<select id="gender" name="gender" onChange={this.handleInputChange} 
							className="form-control" required value={this.state.contact.gender}>
								<option defaultValue value="">Escolha</option>
								<option value="MALE">Masculino</option>
								<option value="FEMALE">Feminino</option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="birthday">Nascimento</label>
							<input type="date" className="form-control" name="birthday" 
							onChange={this.handleInputChange} id="birthday"
							placeholder="Data de Aniversário" value={this.state.contact.birthday || ''}/>
						</div>

						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input type="email" name="email"  onChange={this.handleInputChange} 
							className="form-control" id="email" 
							placeholder="E-mail" value={this.state.contact.email || ''}/>
						</div>
						<div className="form-group">
							<label htmlFor="phone">Telefone</label>
							<input className="form-control" name="phone"
							id="phone" onChange={this.handleInputChange}
							placeholder="Telefone" value={this.state.contact.phone || ''} />
						</div>
					</form>
				</section>
			</Modal>
		)
	}
}

