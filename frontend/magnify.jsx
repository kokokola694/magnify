import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import * as PlaylistActions from './actions/playlist_actions';

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
  window.fetchPlaylist = PlaylistActions.fetchPlaylist;
  window.createPlaylist = PlaylistActions.createPlaylist;
  window.deletePlaylist = PlaylistActions.deletePlaylist;

  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store}/>, root);
})
