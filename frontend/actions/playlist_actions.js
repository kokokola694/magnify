export const RECEIVE_PLAYLISTS = "RECEIVE_PLAYLISTS";
export const RECEIVE_PLAYLIST = "RECEIVE_PLAYLIST";
export const REMOVE_PLAYLIST = "REMOVE_PLAYLIST";
export const RECEIVE_PLAYLIST_ERRORS = "RECEIVE_PLAYLIST_ERRORS";

import * as PlaylistApi from '../util/playlist_api_util';

export const fetchPlaylists = () => dispatch => {
  return PlaylistApi.fetchPlaylists()
  .then(playlists => dispatch(receivePlaylists(playlists)))
}

export const fetchPlaylist = (id) => dispatch => {
  return PlaylistApi.fetchPlaylist(id)
  .then(playlist => dispatch(receivePlaylist(playlist)))
}

export const createPlaylist = (playlist) => dispatch => {
  return PlaylistApi.createPlaylist(playlist).then(
    playlist => dispatch(receivePlaylist(playlist)),
    error => dispatch(receiveErrors(error.responseJSON))
  )
}

export const deletePlaylist = (id) => dispatch => {
  return PlaylistApi.deletePlaylist(id)
  .then(playlist => dispatch(removePlaylist(playlist)))
}


const receivePlaylists = (playlists) => {
  return {
    type: RECEIVE_PLAYLISTS,
    playlists
  }
}

const receivePlaylist = (playlist) => {
  return {
    type: RECEIVE_PLAYLIST,
    playlist
  }
}

const removePlaylist = (playlist) => {
  return {
    type: REMOVE_PLAYLIST,
    playlist
  }
}

export const receiveErrors = (errors) => {
  return {
    type: RECEIVE_PLAYLIST_ERRORS,
    errors
  }
}
