import React from 'react';
import AlbumIndexItem from './album_index_item';

class AlbumIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { currentUser, fetchAlbums, artistAlbumIds, fetchGenre, genreId } = this.props;
    const pathUrl = this.props.match.path;

    document.body.style.backgroundImage = "linear-gradient(rgb(68, 52, 84), black)";

    if (pathUrl.slice(0,11) === "/collection") {
      fetchAlbums(currentUser.saved_album_ids);
    } else if (pathUrl.slice(0,15) === "/browse/artists") {
      fetchAlbums(artistAlbumIds);
    } else if (genreId) {
      fetchGenre(genreId);
    } else if (pathUrl.slice(0,14) === "/browse/albums") {
      fetchAlbums();
    }
  }

  render() {
    const pathUrl = this.props.match.path;
    const albums = this.props.albums.map(album =>
      <AlbumIndexItem key={album.id} album={album}/>);
    const searchHead = pathUrl.slice(0,15) === "/search/results"
      && albums.length > 0 ? (
      <h1 className="search-headings">Albums</h1>
    ) : null;

    return (
      <>
        {searchHead}
        <ul className="index-list">
          {albums}
        </ul>
      </>
    )
  }
}


export default AlbumIndex;
