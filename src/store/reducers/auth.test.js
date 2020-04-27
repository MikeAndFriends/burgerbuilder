import authReducer from './auth';
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

describe('auth reducer', () => {

  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual({
      loading: false,
      token: null,
      userData: null,
      error: null,
      authRedirectPath: '/'
    });
  });
  it('should store the token upon login', () => {
    expect(authReducer({
      // Initial state
      loading: false,
      token: null,
      userData: null,
      error: null,
      authRedirectPath: '/'
    }, {
      type: actionTypes.AUTH_SUCCESS,
      payload: {
        authData: {
          idToken: 'dummy_token',
          localId: 'dummy_localid',
          email: 'dummy_email',
        }
      }
    }
    )).toEqual({
      loading: false,
      token: 'dummy_token',
      userData: {
        userId: 'dummy_localid',
        email: 'dummy_email',
      },
      error: null,
      authRedirectPath: '/'
    });
  });

});
