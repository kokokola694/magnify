export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";
import * as SessionApiUtil from '../util/session_api_util';

export const login = user => dispatch => {
  return SessionApiUtil.login(user).then(
    user => dispatch(receiveCurrentUser(user)),
    error => dispatch(receiveErrors(error.responseJSON))
  )
}

export const signup = user => dispatch => {
  return SessionApiUtil.signup(user).then(
    user => dispatch(receiveCurrentUser(user)),
    error => dispatch(receiveErrors(error.responseJSON))
  )
}

export const logout = () => dispatch => {
  return SessionApiUtil.logout().then(
    () => dispatch(logoutCurrentUser()),
    error => dispatch(receiveErrors(error.responseJSON))
  )
}

export const receiveCurrentUser = currentUser => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser
  }
}

export const logoutCurrentUser = () => {
  return {
    type: LOGOUT_CURRENT_USER,
  }
}

export const receiveErrors = (errors) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors
  }
}

export const clearErrors = () => {
  return {
    type: CLEAR_SESSION_ERRORS
  }
}
