import React from 'react';
import AlbumIndexItem from './album_index_item';

class AlbumIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.body.style.backgroundImage = "linear-gradient(rgb(68, 52, 84), black)";

    if (this.props.match.path.slice(0,11) === "/collection") {
      this.props.fetchAlbums(this.props.currentUser.saved_album_ids);
    } else if (this.props.match.path.slice(0,7) === "/search") {
      this.props.searchAlbums(this.props.input);
    } else if (this.props.match.path.slice(0,7) === "/browse") {
      this.props.fetchAlbums();
    }
  }

  componentDidUpdate(oldProps) {
    if (oldProps.location.pathname !== oldProps.location.pathname) {
      if (this.props.match.path.slice(0,7) === "/search") {
        this.props.searchAlbums(this.props.input);
      }
    }
  }


  render() {
    const al = this.props.albums.map(a => <AlbumIndexItem key={a.id} album={a}/>)
    const alCount = al.length;
    const searchHead = this.props.match.path.slice(0,15) === "/search/results"
      && alCount > 0 ? (
      <h1 className="search-headings">Albums</h1>
    ) : null;
    return (
      <>
        {searchHead}
        <ul className="index-list">
          {al}
        </ul>
      </>

    )
  }
}


export default AlbumIndex;
