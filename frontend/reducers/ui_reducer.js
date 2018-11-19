import { combineReducers } from 'redux';
import modalReducer from './modal_reducer';
import selectedSongReducer from './selected_song_reducer';

export default combineReducers({
  modal: modalReducer,
  selectedSong: selectedSongReducer
})
