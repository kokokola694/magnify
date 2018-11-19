export const RECEIVE_PLAYLISTS = "RECEIVE_PLAYLISTS";
export const RECEIVE_PLAYLIST = "RECEIVE_PLAYLIST";
export const REMOVE_PLAYLIST = "REMOVE_PLAYLIST";
export const RECEIVE_PLAYLIST_ERRORS = "RECEIVE_PLAYLIST_ERRORS";
export const RECEIVE_PLAYLIST_SONG = "RECEIVE_PLAYLIST_SONG";
export const REMOVE_PLAYLIST_SONG = "REMOVE_PLAYLIST_SONG";

import * as PlaylistApi from '../util/playlist_api_util';

export const fetchPlaylists = (ids) => dispatch => {
  return PlaylistApi.fetchPlaylists(ids)
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

export const addPlaylistSong = (playlistSong) => dispatch => {
  return PlaylistApi.addPlaylistSong(playlistSong)
  .then( (playlistSong) => dispatch(receivePlaylistSong(playlistSong)))
}

export const deletePlaylistSong = (playlistSong) => dispatch => {
  return PlaylistApi.deletePlaylistSong(playlistSong)
  .then( (playlistSong) => dispatch(removePlaylistSong(playlistSong)))
}


const receivePlaylists = (playlists) => {
  return {
    type: RECEIVE_PLAYLISTS,
    playlists
  }
}

const receivePlaylist = (playlist, songs) => {
  return {
    type: RECEIVE_PLAYLIST,
    playlist,
    songs
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

export const receivePlaylistSong = ({song_id, playlist_id}) => {
  return {
    type: RECEIVE_PLAYLIST_SONG,
    playlistId: playlist_id,
    songId: song_id
  }
}

export const removePlaylistSong = ({song_id, playlist_id}) => {
  return {
    type: REMOVE_PLAYLIST_SONG,
    playlistId: playlist_id,
    songId: song_id
  }
}
