import * as ActionTypes from './ActionTypes';
import axios from 'axios';

export const startsignup = () => {
    return {
        type: ActionTypes.SIGNUP_START
    };
};

export const signupfailed = (error) => {
    return {
        type: ActionTypes.SIGNUP_FAILED,
        error: error
    };
};

export const signupsuccess = (userId, token) => {
    return {
        type: ActionTypes.SIGNUP_SUCCESS,
        userId: userId,
        token: token
    };
};

export const logout = () => {
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return {
        type: ActionTypes.LOGOUT
    };
};

export const checkAuthState = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authSignUp = (email, password) => {
    return dispatch => {
        dispatch(startsignup());
        const userData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=', userData)
            .then(res => {
                const expirationDate = new Date(new Date().getTime() + (res.data.expiresIn * 1000));
                localStorage.setItem('userId', res.data.localId);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(signupsuccess(res.data.localId, res.data.idToken));
                dispatch(checkAuthState(res.data.expiresIn));
            })
            .catch(err => {
                dispatch(signupfailed(err.response.data.error));
            });
    };
};

export const authSignIn = (email, password) => {
    return dispatch => {
        dispatch(startsignup());
        const userData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=', userData)
            .then(res => {
                console.log(res);
                const expirationDate = new Date(new Date().getTime() + (res.data.expiresIn * 1000));
                localStorage.setItem('userId', res.data.localId);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(signupsuccess(res.data.localId, res.data.idToken));
                dispatch(checkAuthState(res.data.expiresIn));
            })
            .catch(err => {
                dispatch(signupfailed(err.response.data.error));
            });
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expDate = new Date(localStorage.getItem('expirationDate'));
            if (new Date() >= expDate) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(signupsuccess(userId, token));
                dispatch(checkAuthState((expDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};