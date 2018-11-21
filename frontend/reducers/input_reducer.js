import { RECEIVE_INPUT } from '../actions/input_actions';

export default (state = "", action) => {
  switch (action.type) {
    case RECEIVE_INPUT:
      return action.input;
    default: return state;
  }
}
