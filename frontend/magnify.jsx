import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import * as ArtistActions from './actions/artist_actions';
import * as PlaylistActions from './actions/playlist_actions';
import * as SongActions from './actions/song_actions';
import * as UserActions from './actions/user_actions';
import { receiveInput } from './actions/input_actions';

document.addEventListener('DOMContentLoaded', () => {

  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.fetchPlaylists = PlaylistActions.fetchPlaylists;
  window.fetchArtists = ArtistActions.fetchArtists;
  window.fetchArtist = ArtistActions.fetchArtist;
  window.searchSongs = SongActions.searchSongs;
  window.followUser = UserActions.followUser;
  window.unfollowUser = UserActions.unfollowUser;
  window.receiveInput = receiveInput;


  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store}/>, root);
})
