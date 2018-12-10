import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


//import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
//import thunk from 'redux-thunk';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Contacts from './components/Contacts';

import PageNotFound from './components/PageNotFound';

// use applyMiddleware to add the thunk middleware to the store
//const store = createStore(applyMiddleware(thunk));
const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route path="/" exact={true} component={App} />
				<Route path="/contacts" exact={true} component={Contacts} />
				<Route path='*' component={PageNotFound} />
			</Switch>
		</BrowserRouter>
	</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
