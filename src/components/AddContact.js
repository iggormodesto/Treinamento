import React from 'react';

import { Modal } from 'antd';

//import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
//import * as contactAction from '../actions/contactAction';
import { addContact } from '../actions/contactAddAction';

export class AddContact extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			contact: [],
			visibleModal: true
		}		
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			visibleModal: nextProps.visibleModalAdd,
			contact: []
		});
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
		this.setState({
			visibleModal: false,
		});
		this.props.handleCancel();
	}


	handleSubmit = event => {
		this.props.onAddContact(this.state.contact);
		this.handleCancel();
		event.preventDefault();
	}
	
	render(){
		return(
			<Modal
				title="Adicionar"
				visible={this.state.visibleModal}
				onCancel={this.handleCancel}
				footer={[
					<a key="back" onClick={this.handleCancel}>Cancelar</a>,
					<button key="submit" onClick={this.handleSubmit.bind(this)} type="submit" className="btn ant-btn-primary">Adicionar</button>

				]}			
			>
				<section className="container text-left">
					<form>
						<div className="form-group">
							<label htmlFor="name">Nome:</label>
							<input type="text" className="form-control" name="name" id="name"
							value={this.state.contact.name || ''}
							onChange={this.handleInputChange} 
							placeholder="Nome completo"/>
						</div>
						<div className="form-group">
							<label htmlFor="gender">Gênero:</label>
							<select id="gender" name="gender" className="form-control" required
							value={this.state.contact.gender || ''}
							onChange={this.handleInputChange}>
								<option defaultValue value="">Selecione</option>
								<option value="MALE">Masculino</option>
								<option value="FEMALE">Feminino</option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="birthday">Nascimento:</label>
							<input type="date" className="form-control" name="birthday" id="birthday"
							value={this.state.contact.birthday || ''}
							onChange={this.handleInputChange} />
						</div>
						<div className="form-group">
							<label htmlFor="email">Email:</label>
							<input type="email" name="email"  
							className="form-control" id="email" 
							value={this.state.contact.email || ''}
							onChange={this.handleInputChange}
							placeholder="usuario@dominio.com.br"/>
						</div>
						<div className="form-group">
							<label htmlFor="phone">Telefone:</label>
							<input type="number" className="form-control"
							name="phone" id="phone"
							value={this.state.contact.phone || ''}
							onChange={this.handleInputChange}
							placeholder="(00) 00000-0000"
							data-mask="(00) 0000-0000" data-mask-selectonfocus="true" />
						</div>
					</form>
				</section>
			</Modal>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
	  contacts: state.contacts
	}
  };
  
  const mapDispatchToProps = (dispatch) => {
	return {
	  onAddContact: contact => dispatch(addContact(contact))
	}
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddContact);