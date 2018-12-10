import {ADD_CONTACT_STARTED, ADD_CONTACT_SUCCESS, ADD_CONTACT_FAILURE} from './actionTypes';
import { getAllContacts } from './contactGetAction';

export const addContact = (contact) => {
  
    return dispatch => {
      dispatch(addContactStarted());
    
      fetch('http://localhost:8080/contacts', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
        'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
          }).then(res => {
        //dispatch(addContactSuccess(contact));
        console.log(res);
        alert('Contato cadastrado');
        dispatch(getAllContacts());
        })
          .catch(function (error) {
         dispatch(addContactFailure(error));
                console.log(error);
          });
    };    
  };

  const addContactSuccess = contact => ({
    type: ADD_CONTACT_SUCCESS,
    payload: contact
  });
  const addContactStarted = () => ({
    type: ADD_CONTACT_STARTED
  })
  
  const addContactFailure = error => ({
    type: ADD_CONTACT_FAILURE,
    contacts: { error: error }
  })