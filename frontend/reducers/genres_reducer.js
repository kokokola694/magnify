import { RECEIVE_GENRES } from '../actions/genre_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_GENRES:
      return merge({}, state, action.genres);
    default:
      return state;
  }
}
