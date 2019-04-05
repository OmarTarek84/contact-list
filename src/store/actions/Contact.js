import * as ActionTypes from './ActionTypes';
import axios from '../../axios-contact';

export const startAdding = () => {
    return {
        type: ActionTypes.ADDING_START
    };
};

export const addingSuccess = (contactId, contactData) => {
    return {
        type: ActionTypes.ADDING_SUCCESS,
        contactId: contactId,
        contactData: contactData
    };
};

export const addingFailed = (error) => {
    return {
        type: ActionTypes.ADDING_FAILED,
        error: error
    };
};

export const addContactsSuccess = (contactData, token) => {
    return dispatch => {
        dispatch(startAdding());
        axios.post('/contacts.json?auth=' + token, contactData).then(response => {
            dispatch(addingSuccess(response.data.name, contactData));
        })
        .catch(err => {
            console.log(err);
        });
    };
};

///////////////////////////////
// fetching contacts ////////////////
/////////////////////////////////////

export const startFetching = () => {
    return {
        type: ActionTypes.START_FETCHING_CONTACTS
    };
};

export const fetchingSuccess = (contacts) => {
    return {
        type: ActionTypes.FETCHED_CONTACTS_SUCCESS,
        contacts: contacts
    };
};

export const fetchingFailed = (error) => {
    return {
        type: ActionTypes.FETCHED_CONTACTS_FAILED,
        error: error
    };
};

export const successFetchedContacts = (token, userId) => {
    return dispatch => {
        dispatch(startFetching());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/contacts.json' + queryParams).then(response => {
            let allContacts = [];
            for (let key in response.data) {
                allContacts.push({
                    id: key,
                    ...response.data[key]
                })
            }
            dispatch(fetchingSuccess(allContacts));
        })
        .catch(err => {
            dispatch(fetchingFailed(err));
        });
    };
};


///////////////////////////////
// editing contacts ////////////////
/////////////////////////////////////

export const startEditing = () => {
    return {
        type: ActionTypes.START_EDITING_CONTACTS
    }
}

export const failEditing = (error) => {
    return {
        type: ActionTypes.EDITING_FAILED,
        error: error
    }
}

export const sucessEditing = (contactId, contactData) => {
    return {
        type: ActionTypes.EDITING_SUCCESS,
        contactId: contactId,
        contactData: contactData
    }
}

export const editingSuccessFinal = (contactId, contactData, token, userId) => {
    return dispatch => {
        dispatch(startEditing);
        const queryParams = '?auth=' + token;
        axios.put(`/contacts/${contactId}.json` + queryParams, contactData).then(res => {
            dispatch(sucessEditing(contactId, contactData))
        })
        .catch(err => {
            dispatch(failEditing(err));
        })
    }
}

export const deleteContact = (contactId) => {
    return {
        type: ActionTypes.DELETE_CONTACT,
        id: contactId
    }
}

export const asyncDeleteContact = (contactId, token, userId) => {
    return dispatch => {
        const queryParams = '?auth=' + token;
        axios.delete(`/contacts/${contactId}.json` + queryParams).then(res => {
            dispatch(deleteContact(contactId))
        });
    }
}