import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Contacts from './components/Contacts';
import AddContact from './components/AddContact';
import PageNotFound from './components/PageNotFound';

import { Store } from './store';

// use applyMiddleware to add the thunk middleware to the store
const store = createStore(applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route path="/" exact={true} component={App} />
				<Route path="/contacts" exact={true} component={Contacts} />
				<Route path="/addContac" component={AddContact} />
				<Route path='*' component={PageNotFound} />
			</Switch>
		</BrowserRouter>
	 </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
