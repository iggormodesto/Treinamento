import {UPDATE_CONTACT_FAILURE, UPDATE_CONTACT_STARTED, UPDATE_CONTACT_SUCCESS} from './actionTypes';
import { getAllContacts } from './contactGetAction';

export const updateContact = (contact) => {
  
    return dispatch => {
      dispatch(updateContactStarted());
    
      fetch(contact._links.self.href, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
                  'Content-Type': 'application/json'
        },
          body: JSON.stringify(contact)
      }).then(res=> {
        dispatch(getAllContacts());
        alert('Contato atualizado');
       })
       .catch(function (error) {
        dispatch(updateContactFailure(error));
        console.log(error);
        });
    };
  };

  const updateContactSuccess = contact => ({
    type: UPDATE_CONTACT_SUCCESS,
    payload: contact
  });
  const updateContactStarted = () => ({
    type: UPDATE_CONTACT_STARTED
  })
  
  const updateContactFailure = error => ({
    type: UPDATE_CONTACT_FAILURE,
    contacts: { error: error }
  })