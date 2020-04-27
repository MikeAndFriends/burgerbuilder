import * as actionTypes from './actionTypes';
import axios from 'axios';

export const logout = () => {
  // Clear local storage
  localStorage.removeItem('authToken');
  localStorage.removeItem('authTokenExpirationDate');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
      setTimeout(() => {
        dispatch(logout());
      }, expirationTime * 1000);
  };
}

export const auth = (payload) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: payload.loginData.email,
      password: payload.loginData.password,
      returnSecureToken: true
    };
    const webAPIKey = 'yourApiKey';
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
    if (!payload.isSignup)
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
    axios.post(url + webAPIKey, authData)
      .then(response => {
        const tokenExpirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('authToken', response.data.idToken);
        localStorage.setItem('authTokenExpirationDate', tokenExpirationDate);
        localStorage.setItem('userEmail', response.data.email);
        localStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data));
        dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch(error => {
      dispatch(authFail(error.response.data.error));
    });
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
};

export const authFail = (error) => {
  const errorMessages = {
    EMAIL_EXISTS: 'Error: The email address is already in use by another account.',
    OPERATION_NOT_ALLOWED: 'Error: Password sign-in is disabled for this project.',
    TOO_MANY_ATTEMPTS_TRY_LATER: 'Error: We have blocked all requests from this device due to unusual activity. Try again later.',
    EMAIL_NOT_FOUND: 'Error: There is no user record corresponding to this identifier. The user may have been deleted.',
    INVALID_PASSWORD: 'Error: The password is invalid or the user does not have a password.',
    USER_DISABLED: 'Error: The user account has been disabled by an administrator.',
  }

  return {
      type: actionTypes.AUTH_FAIL,
      error: errorMessages[error.message]
  }
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {authData: authData}
  }
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
};

export const authCheckIfLoggedIn = () => {
  return dispatch => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      dispatch(logout());
    } else {
      const authTokenExpirationDate = new Date(
        localStorage.getItem('authTokenExpirationDate')
      );

      if (authTokenExpirationDate > new Date()) {
        dispatch(checkAuthTimeout(Math.floor((new Date(authTokenExpirationDate) - new Date())/1000)));
        dispatch(authSuccess({
          idToken: authToken,
          localId: localStorage.getItem('userId'),
          email: localStorage.getItem('userEmail'),
        }));
      } else {
        dispatch(logout());
      }
    }
  };
};
