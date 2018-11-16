import { connect } from 'react-redux';
import AlbumShow from './album_show';
import { withRouter } from 'react-router-dom';
import { fetchSong } from '../../actions/song_actions';
import { fetchAlbum } from '../../actions/album_actions';

const msp = (state, ownProps) => {
  const albumId = ownProps.match.params.albumId;
  const album = state.entities.albums[albumId] || {};
  const updatedAlbum = Object.assign({}, album, {artist: state.entities.artists[album.artist_id]});
  return { album: updatedAlbum }
}

const mdp = dispatch => {
  return {
    fetchAlbum: (albumId) => dispatch(fetchAlbum(albumId))
  }
}

export default withRouter(connect(msp, mdp)(AlbumShow));
