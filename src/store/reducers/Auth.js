import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    userId: null,
    token: null,
    error: null,
    loading: false,
    signed: false
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.SIGNUP_START:
            return {
                ...state,
                loading: true,
                signed: false,
                token: null
            }
        case ActionTypes.SIGNUP_FAILED:
            return {
                ...state,
                loading: false,
                signed: false,
                token: null,
                error: action.error
            }
        case ActionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                loading: false,
                signed: true,
                error: null
            }
        case ActionTypes.LOGOUT:
            return {
                ...state,
                loading: false,
                token: null,
                userId: null,
                signed: false
            }
        default: 
            return state;
    }
}

export default authReducer;