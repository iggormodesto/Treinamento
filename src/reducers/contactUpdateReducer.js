import {UPDATE_CONTACT_FAILURE, UPDATE_CONTACT_STARTED, UPDATE_CONTACT_SUCCESS} from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null,
    list: []
}

export default (state = initialState, action) => {
    switch (action.type){
        case UPDATE_CONTACT_STARTED:
            return {
                ...state,
                loading: true
            };
      case UPDATE_CONTACT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                list: [action.payload, ...state.list]
            };
      case UPDATE_CONTACT_FAILURE:
            return {
            ...state,
            loading: false,
            error: action.contacts.error
            }
      default:
            return state;
    }
}