import {GET_ALL_CONTACTS_FAILURE, GET_ALL_CONTACTS_STARTED, GET_ALL_CONTACTS_SUCCESS}  from './actionTypes';

//Action Creator para get contacts
export const getAllContacts = () =>{
  return dispatch => {
    dispatch(getAllContactsStarted());

    fetch("http://localhost:8080/contacts", {
			method: 'get'
		}).then(res => res.json())
		.then(
			data => {
				const contacts = data._embedded.contacts;
				contacts.map((contact) => {
					if(contact.gender === null){
						contact.gender = '';
					}
					if(contact.birthday === null){
						contact.birthday = '';
					}
				})
        //this.setState({ contacts });
        console.log(contacts);
        dispatch(getAllContactsSuccess(contacts));
				},
			err => {
        console.log(err);
        dispatch(getAllContactsFailure(err));
			}

		);
  }
}

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