import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  loading: false,
  token: null,
  userData: null,
  error: null,
  authRedirectPath: '/',
}

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userData: null,
  });
};

const authStart = (state, action) => {
  return updateObject(state, {loading: true, error: null});
}

const authSuccess = (state, action) => {

  return updateObject(state, {
    loading: false,
    token: action.payload.authData.idToken,
    userData: {
      userId: action.payload.authData.localId,
      email: action.payload.authData.email,
    },
    error: null,
  });
}

const authFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
    token: null
  });
}

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, {
    authRedirectPath: action.path,
  });
}

// Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
    default: return state;
  }
}

export default authReducer;
