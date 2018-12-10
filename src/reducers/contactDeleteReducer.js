import {DELETE_CONTACT_STARTED, DELETE_CONTACT_SUCCESS, DELETE_CONTACT_FAILURE} from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null,
    list: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case DELETE_CONTACT_SUCCESS:
        console.log(action.payload)
        return {
            ...state,
            loading: false,
            list: [
            ...state.list.slice(0, action.payload),
            ...state.list.slice(action.payload + 1)
            ]
        };
        default:
            return state;
    }
}