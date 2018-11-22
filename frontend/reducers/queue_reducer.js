import { RECEIVE_QUEUE } from '../actions/queue_actions';


export default (state = [], action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_QUEUE:
      return action.queue;
    default:
      return state;
  }
}
