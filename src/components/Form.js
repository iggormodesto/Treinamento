import React from 'react';
import reactDOM from 'react-dom';
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
		return(
			<form >
				<label htmlFor="name">Nome</label>
				<input type="text" name="name" id="name" onChange=""/>
				<label htmlFor="gender">Gênero</label>
				<select type="text" name="gender" id="gender" onChange="">
					<option defaultValue value="">Escolha</option>
					<option value="MALE">Masculino</option>
					<option value="FEMALE">Feminino</option>
				</select>
				<label htmlFor="date">Data</label>
				<input type="date" name="date" id="date" onChange=""/>
				<label htmlFor="email">E-mail</label>
				<input type="email" name="email" id="email" onChange=""/>
				<label htmlFor="phone">Telefone</label>
				<input type="number" name="phone" id="phone" onChange=""/>
				<button type="submit">Salvar</button>
			</form>

		)
	}
}

