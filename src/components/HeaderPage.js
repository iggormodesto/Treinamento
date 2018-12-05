import React from 'react';

export default class HeaderPage extends React.Component{
	constructor(props){
		super(props);
		this.state = {

		}
	}

	componentDidMount(){

	}

	render(){
		return(
			<header>
				<img src={require('../images/Logo.png')} />
			</header>
		)
	}
}

