import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';
import Search from './search';
import { searchPlaylists, fetchPlaylists } from '../../actions/playlist_actions';
import { searchAlbums, fetchAlbums } from '../../actions/album_actions';
import { searchArtists, fetchArtists } from '../../actions/artist_actions';
import { searchSongs, fetchSongs } from '../../actions/song_actions';

const msp = (state, ownProps) => {
  return {

  }
}

const mdp = dispatch => {
  return {
    searchSongs: input => dispatch(searchSongs(input)),
    searchAlbums: input => dispatch(searchAlbums(input)),
    searchArtists: input => dispatch(searchArtists(input)),
    searchPlaylists: input => dispatch(searchPlaylists(input)),
    fetchSongs: () => dispatch(fetchSongs()),
    fetchAlbums: () => dispatch(fetchAlbums()),
    fetchArtists: () => dispatch(fetchArtists()),
    fetchPlaylists: () => dispatch(fetchPlaylists()),
  }
}

export default withRouter(connect(msp, mdp)(Search));
