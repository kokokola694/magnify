import React from 'react';
import Search from './search';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchAlbums } from '../../actions/album_actions';
import { fetchArtists } from '../../actions/artist_actions';
import { fetchPlaylists } from '../../actions/playlist_actions';
import { fetchSongs } from '../../actions/song_actions';

const mdp = dispatch => {
  return {
    fetchSongs: () => dispatch(fetchSongs()),
    fetchAlbums: () => dispatch(fetchAlbums()),
    fetchArtists: () => dispatch(fetchArtists()),
    fetchPlaylists: () => dispatch(fetchPlaylists()),
  }
}

export default withRouter(connect(null, mdp)(Search));
