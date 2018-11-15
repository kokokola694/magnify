import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import playlistsReducer from './playlists_reducer';
import artistsReducer from './artists_reducer';
import albumsReducer from './albums_reducer';


export default combineReducers({
  users: usersReducer,
  playlists: playlistsReducer,
  artists: artistsReducer,
  albums: albumsReducer
})
