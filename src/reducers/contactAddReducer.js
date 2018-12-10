import {ADD_CONTACT_STARTED, ADD_CONTACT_SUCCESS, ADD_CONTACT_FAILURE} from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null,
    list: []
}

export default (state = initialState, action) => {
    switch (action.type){
        case ADD_CONTACT_STARTED:
            return {
                ...state,
                loading: true
            };
      case ADD_CONTACT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                list: [action.payload, ...state.list]
            };
      case ADD_CONTACT_FAILURE:
            return {
            ...state,
            loading: false,
            error: action.contacts.error
            }
      default:
            return state;
    }
}