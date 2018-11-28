import { connect } from 'react-redux';
import PlaylistShow from './playlist_show';
import { withRouter } from 'react-router-dom';
import { fetchPlaylist } from '../../actions/playlist_actions';
import { fetchSongs } from '../../actions/song_actions';
import { fetchArtists } from '../../actions/artist_actions';
import { fetchAlbums } from '../../actions/album_actions';
import React from 'react';
import { openModal, closeModal } from '../../actions/modal_actions';
import { createSave, deleteSave } from '../../actions/save_actions';


const msp = (state, ownProps) => {
  const playlistId = ownProps.match.params.playlistId;
  const playlist = state.entities.playlists[playlistId] || {song_ids: []};
  const currentUserId = state.session.id;
  const currentUser = state.entities.users[currentUserId]
  const savedIndicator = currentUser.saved_playlist_ids.includes(parseInt(playlistId));
  const albums = state.entities.albums;
  const artists = state.entities.artists;
  const songs = Object.values(state.entities.songs).filter(song => playlist.song_ids.includes(song.id));
  return { playlist, currentUserId, currentUser, savedIndicator, songs }
}

const mdp = dispatch => {
  return {
    createSave: (saveInfo) => dispatch(createSave(saveInfo)),
    deleteSave: (saveInfo) => dispatch(deleteSave(saveInfo)),
    closeModal: () => dispatch(closeModal()),
    openModal: (
      <div className="playlist-delete">
        <button className="playlist-delete-btn" onClick={() => dispatch(openModal("deletePlaylist"))}>
          Delete
        </button>
      </div>
    ),
    fetchPlaylist: (playlistId) => dispatch(fetchPlaylist(playlistId)),
    receiveQueue: (queue) => dispatch(receiveQueue(queue)),
    fetchAlbums: (ids) => dispatch(fetchAlbums(ids)),
    fetchArtists: (ids) => dispatch(fetchArtists(ids)),
    fetchSongs: (ids) => dispatch(fetchSongs(ids)),
  }
}

export default withRouter(connect(msp, mdp)(PlaylistShow));
