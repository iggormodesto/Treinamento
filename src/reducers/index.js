// index.js

import { combineReducers } from 'redux';
import getContacts from './contactGetReducers';
import addContact from './contactAddReducer';
import deleteContact from './contactDeleteReducer';

export default combineReducers({
    contacts: getContacts,
    addContact: addContact,
    deleteContact: deleteContact
});