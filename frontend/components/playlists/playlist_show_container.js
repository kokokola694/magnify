import React from 'react';
import PlaylistShow from './playlist_show';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPlaylist } from '../../actions/playlist_actions';
import { fetchSongs } from '../../actions/song_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { createSave, deleteSave } from '../../actions/save_actions';
import { addQueue, fetchPlaySong, clearQueue } from '../../actions/player_actions';


const msp = (state, ownProps) => {
  const { playlists, users, albums, songs } = state.entities;

  const playlistId = ownProps.match.params.playlistId;
  const playlist = playlists[playlistId] || {song_ids: []};
  const currentUser = users[state.session.id];
  const savedIndicator = currentUser.saved_playlist_ids
    .includes(parseInt(playlistId));
  const updatedSongs = Object.values(songs)
    .filter(song => playlist.song_ids.includes(song.id));
  const firstPhoto = updatedSongs.length === 0 ?
    null : albums[updatedSongs[0].album_id].photoUrl;

  return {
    songs: updatedSongs,
    playlist,
    currentUser,
    savedIndicator,
    firstPhoto,
  }
}

const mdp = dispatch => {
  return {
    createSave: (saveInfo) => dispatch(createSave(saveInfo)),
    deleteSave: (saveInfo) => dispatch(deleteSave(saveInfo)),
    fetchPlaylist: (playlistId) => dispatch(fetchPlaylist(playlistId)),
    fetchSongs: (ids) => dispatch(fetchSongs(ids)),
    addQueue: (queue, shuffledQueue) => dispatch(addQueue(queue, shuffledQueue)),
    clearQueue: () => dispatch(clearQueue()),
    fetchPlaySong: (song) => dispatch(fetchPlaySong(song)),
    closeModal: () => dispatch(closeModal()),
    openModal: (
      <div className="playlist-delete">
        <button className="playlist-delete-btn"
          onClick={() => dispatch(openModal("deletePlaylist"))}>
          Delete
        </button>
      </div>
    ),
  }
}

export default withRouter(connect(msp, mdp)(PlaylistShow));
