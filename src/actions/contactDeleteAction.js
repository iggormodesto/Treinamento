import {DELETE_CONTACT_STARTED, DELETE_CONTACT_SUCCESS, DELETE_CONTACT_FAILURE} from './actionTypes';
import { getAllContacts } from './contactGetAction';

export const deleteContact = (contact, contactIndex) => {
    return dispatch =>{
      dispatch(deleteContactStarted())
      fetch(contact._links.self.href, {
        method: 'delete'
      }).then(() =>{
        console.log(contactIndex);
        dispatch(deleteContactSuccess(contactIndex));
        dispatch(getAllContacts());
      });
    }
}

const deleteContactStarted = () => ({
    type: DELETE_CONTACT_STARTED,
  });
  const deleteContactSuccess = (contactIndex) => ({
    type: DELETE_CONTACT_SUCCESS,
    payload: contactIndex
  });