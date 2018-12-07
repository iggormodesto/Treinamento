import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './css/App.css';
import {
	Form, 
	Icon, 
	Input, 
	Button, 
	Checkbox
  } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

class App extends Component {
	
	render() {
		return (
			
			<div className="main">
				<h1>Login</h1>
				<Form className="login-form">
					<FormItem>
						<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Usuário" />
					</FormItem>
					<FormItem>
						<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Senha" />
					</FormItem>
					<FormItem>
						<Checkbox>Remember me</Checkbox>
						<a className="login-form-forgot">Forgot password</a>
					</FormItem>
					<Button type="primary" className="login-form-button"> 
						<Link to="/contacts">ENTRAR</Link>
					</Button>
				</Form>
			</div>
		);
	}
}

export default (App);