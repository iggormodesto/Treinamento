import React from 'react';
import reactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Contact from './models/contact';
export default class Form extends React.Component{
	constructor(props){
		super(props);
		this.state = {

		}
	}

	componentDidMount(){

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
						<button style={btnMargin} className="btn btn-light">Voltar</button>
						<button type="submit" className="btn btn-primary">Salvar</button>
					</div>
				</form>
			</section>
		)
	}
}

