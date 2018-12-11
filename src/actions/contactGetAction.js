import {GET_ALL_CONTACTS_FAILURE, GET_ALL_CONTACTS_STARTED, GET_ALL_CONTACTS_SUCCESS}  from './actionTypes';
import {SEARCH_CONTACTS_STARTED, SEARCH_CONTACTS_SUCCESS}  from './actionTypes';
import axios from 'axios';

//Action Creator para get contacts
export const getAllContacts = () =>{
  return dispatch => {
    dispatch(getAllContactsStarted());

    axios.get('http://localhost:8080/contacts')
    .then(res => {
      const contacts  = res.data._embedded.contacts;
      dispatch(getAllContactsSuccess(contacts))
    }).catch( error => {
        console.log(error);
        dispatch(getAllContactsFailure(error));
      });


    // fetch("http://localhost:8080/contacts", {
		// 	method: 'get'
		// }).then(res => res.json())
		// .then(
		// 	data => {
		// 		const contacts = data._embedded.contacts;
		// 		contacts.map((contact) => {
		// 			if(contact.gender === null){
		// 				contact.gender = '';
		// 			}
		// 			if(contact.birthday === null){
		// 				contact.birthday = '';
		// 			}
		// 		})
    //     //this.setState({ contacts });
    //     console.log(contacts);
    //     dispatch(getAllContactsSuccess(contacts));
		// 		},
		// 	err => {
    //     console.log(err);
    //     dispatch(getAllContactsFailure(err));
		// 	}

		// );
  }
}


//Action Creator search contacts
export const handleSearch = (contacts, searchQuery) =>{
  return dispatch => {
    console.log(contacts);
    dispatch(searchContactsStarted());
		var displayedContacts = contacts.filter(function(el){
		  var searchValue = el.name.toLowerCase();
		  return searchValue.indexOf(searchQuery) !==-1;
    });
    dispatch(searchContactsSuccess(displayedContacts));
  }
}

const searchContactsStarted = () => ({
  type: SEARCH_CONTACTS_STARTED
});

const searchContactsSuccess = contacts => ({
  type: SEARCH_CONTACTS_SUCCESS,
  payload: contacts
});

const getAllContactsStarted = () => ({
    type: GET_ALL_CONTACTS_STARTED
});

const getAllContactsSuccess = contacts => ({
    type: GET_ALL_CONTACTS_SUCCESS,
    payload: contacts
});

const getAllContactsFailure = error => ({
    type: GET_ALL_CONTACTS_FAILURE,
    contacts: {
      error: error
    }
});