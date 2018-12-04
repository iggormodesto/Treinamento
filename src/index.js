import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Contacts from './components/Contacts';
import Form from './components/Form';
import PageNotFound from './components/PageNotFound';

import { Store } from './store';

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route path="/" exact={true} component={App} />
			<Route path="/contacts" exact={true} component={Contacts} />
			<Route path="/addContac" component={Form} />
			<Route path='*' component={PageNotFound} />
		</Switch>
    </BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
