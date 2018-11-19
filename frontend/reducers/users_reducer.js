import {RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER} from '../actions/session_actions';
import { merge } from 'lodash';
import { RECEIVE_SAVE, REMOVE_SAVE } from '../actions/save_actions';

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, state, {[action.currentUser.id]: action.currentUser});
    case RECEIVE_SAVE:
    
      const newState = merge({}, state);
      const ids = "saved_" + action.savableType.toLowerCase() + "_ids";
      newState[action.saverId][ids].push(action.savableId);
      return newState;
    case REMOVE_SAVE:
    
      const newState1 = merge({}, state);
      const ids1 = "saved_" + action.savableType.toLowerCase() + "_ids";
      const idx = newState1[action.saverId][ids1].indexOf(action.savableId);
      newState1[action.saverId][ids1].splice(idx, 1);
      return newState1;
    default:
      return state;
  }
}
