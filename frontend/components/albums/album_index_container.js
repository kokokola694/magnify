import { connect } from 'react-redux';
import { fetchAlbums } from '../../actions/album_actions';
import AlbumIndex from './album_index';
import { withRouter } from 'react-router'

const msp = (state, ownProps) => {
  let albums;
  const artistId = ownProps.match.params.artistId;

  if (artistId) {
    albums = Object.values(state.entities.albums).filter(album => album.artist_id == artistId);
  } else {
    albums = Object.values(state.entities.albums);
  }

  const updatedAlbums = albums.map(album => {
    const artistName = state.entities.artists[album.artist_id].name
    return Object.assign({}, album, {artistName});
  })
  return {
    albums: updatedAlbums,
    currentUserId: state.session.id,
    indexType: ownProps.match.params.url
  }
}

const mdp = dispatch => {
  return {
    fetchAlbums: (ids) => dispatch(fetchAlbums(ids))
  }
}

export default withRouter(connect(msp, mdp)(AlbumIndex));
