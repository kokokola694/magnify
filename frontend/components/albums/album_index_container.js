import { connect } from 'react-redux';
import { fetchAlbums } from '../../actions/album_actions';
import AlbumIndex from './album_index';
import { withRouter } from 'react-router'

const msp = (state, ownProps) => {
  let albums = [];
  const artistId = ownProps.match.params.artistId;
  const currentUser = state.entities.users[state.session.id];
  if (ownProps.match.path.slice(0,11) === "/collection") {
    albums = Object.values(state.entities.albums).filter(album => currentUser.saved_album_ids.includes(album.id));
  } else if (ownProps.match.path.slice(0,7) === "/browse") {
    if (artistId) {
      albums = Object.values(state.entities.albums).filter(album => album.artist_id == artistId);
    } else {
      albums = Object.values(state.entities.albums);
    }
  }

  const updatedAlbums = albums.map(album => {
    const artistName = state.entities.artists[album.artist_id].name
    return Object.assign({}, album, {artistName});
  })
  return {
    albums: updatedAlbums,
    currentUser,
  }
}

const mdp = dispatch => {
  return {
    fetchAlbums: (ids) => dispatch(fetchAlbums(ids))
  }
}

export default withRouter(connect(msp, mdp)(AlbumIndex));
