import { connect } from 'react-redux';
import { fetchAlbums } from '../../actions/album_actions';
import { fetchGenre } from '../../actions/genre_actions';
import AlbumIndex from './album_index';
import { withRouter } from 'react-router';


const msp = (state, ownProps) => {
  let input;
  let artistAlbumIds;
  let albums = Object.values(state.entities.albums);

  const artistId = ownProps.match.params.artistId;
  const genreId = ownProps.match.params.genreId;
  const artist = state.entities.artists[artistId] || {album_ids: []};
  const currentUser = state.entities.users[state.session.id];
  const pathUrl = ownProps.match.path;
  const genre = state.entities.genres[genreId] || {name: ""};

  if (pathUrl.slice(0,11) === "/collection") {
    albums = albums.filter(album => currentUser.saved_album_ids
      .includes(album.id));

  } else if (pathUrl.slice(0,16) === "/browse/featured") {
    albums = albums.slice(6,16);
  } else if (pathUrl.slice(0,7) === "/browse") {
    if (artistId) {
      albums = albums.filter(album => album.artist_id == artistId);
      artistAlbumIds = artist.album_ids;
    } else if (genreId) {
      albums = albums.filter(album => album.genre_id == genreId);
    } else {
      albums = albums;
    }

  } else if (pathUrl.slice(0,7) === "/search") {
    input = ownProps.location.pathname.split('/')[3];
    albums = albums.filter(album => album.title.toLowerCase()
      .includes(input.toLowerCase()));
  }

  const updatedAlbums = albums.map(album => {
    const artistName = state.entities.artists[album.artist_id].name;
    return Object.assign({}, album, {artistName});
  })

  return {
    albums: updatedAlbums,
    currentUser,
    input,
    artistAlbumIds,
    genreId,
    genreName: genre.name
  }
}

const mdp = dispatch => {
  return {
    fetchAlbums: (ids) => dispatch(fetchAlbums(ids)),
    fetchGenre: (id) => dispatch(fetchGenre(id))
  }
}

export default withRouter(connect(msp, mdp)(AlbumIndex));
