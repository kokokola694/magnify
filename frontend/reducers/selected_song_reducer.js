import{ RECEIVE_SELECTED_SONG} from '../actions/song_actions';


export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_SELECTED_SONG:
      return action.selectedSong;
    default:
      return state;
  }
}
