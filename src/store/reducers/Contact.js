import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    contacts: [],
    loading: false,
    error: null,
    purchased: false
};

const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ADDING_START:
            return {
                ...state,
                loading: true,
                error: action.error,
                purchased: false
            }
        case ActionTypes.ADDING_SUCCESS:
            const contactdata = {
                ...action.contactData,
                id: action.contactId
            }
            return {
                ...state,
                loading: false,
                purchased: false,
                contacts: state.contacts.concat(contactdata)
            }
        case ActionTypes.ADDING_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                purchased: false
            }

        case ActionTypes.START_FETCHING_CONTACTS:
            return {
                ...state,
                loading: true,
                error: null,
                purchased: false
            }
        case ActionTypes.FETCHED_CONTACTS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                purchased: false
            }
        case ActionTypes.FETCHED_CONTACTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                contacts: action.contacts,
                purchased: false
            }

        case ActionTypes.START_EDITING_CONTACTS:
            return {
                ...state,
                loading: true,
                error: null,
                purchased: false
            }
        case ActionTypes.EDITING_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case ActionTypes.EDITING_SUCCESS:
            const updatedContactData = {
                ...action.contactData,
                id: action.contactId
            }

            const targetedContactIndex = state.contacts.findIndex(contact => {
                return contact.id === updatedContactData.id
            })

            return {
                ...state,
                loading: false,
                error: null,
                contacts: [
                    ...state.contacts,
                    state.contacts[targetedContactIndex] = updatedContactData
                ],
                purchased: true
            }

        case ActionTypes.DELETE_CONTACT:
            const filteringContacts = state.contacts.filter(contact => {
                return contact.id !== action.id
            })
            return {
                ...state,
                loading: false,
                purchased: false,
                error: null,
                contacts: filteringContacts,
            }
            
        default:
            return state;
    }
};

export default contactReducer;