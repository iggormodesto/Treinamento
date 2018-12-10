import {GET_ALL_CONTACTS_FAILURE, GET_ALL_CONTACTS_STARTED, GET_ALL_CONTACTS_SUCCESS}  from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null,
    list: []
}
export default (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_CONTACTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                list: action.payload
            };
      
        case GET_ALL_CONTACTS_STARTED:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_ALL_CONTACTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.contacts.error
            };
        default:
            return state;
    }
}