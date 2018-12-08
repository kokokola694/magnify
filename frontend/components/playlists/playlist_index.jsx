import React from 'react';
import PlaylistIndexItem from './playlist_index_item';

class PlaylistIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.match.path.slice(0,11) === "/collection") {
      this.props.fetchPlaylists(this.props.currentUser.saved_playlist_ids);
      this.props.fetchPlaylists(this.props.currentUser.playlist_ids);
    // } else if (this.props.match.path.slice(0,7) === "/search") {
    //   this.props.searchPlaylists(this.props.input);
    } else if (this.props.match.path.slice(0,7) === "/browse") {
      this.props.fetchPlaylists();
    }
  }

  // componentDidUpdate(oldProps) {
  //   debugger
  //   if (oldProps.playlists[oldProps.playlists.length-1] !== this.props.playlists[this.props.playlists.length-1]) {
  //     if (this.props.match.path.slice(0,11) === "/collection") {
  //       this.props.fetchPlaylists(this.props.currentUser.saved_playlist_ids);
  //       this.props.fetchPlaylists(this.props.currentUser.playlist_ids);
  //     } else if (this.props.match.path.slice(0,7) === "/browse") {
  //       this.props.fetchPlaylists();
  //     }
  //   }
  // }

  render() {
    const pl = this.props.playlists.map(p => <PlaylistIndexItem key={p.id} playlist={p}/>)
    const plCount = pl.length;
    const searchHead = (this.props.match.path.slice(0,15) === "/search/results" ||
      this.props.match.path.slice(0,13) === "/browse/users") && plCount > 0 ? (
      <h1 className="search-headings">Playlists</h1>
    ) : null;
    return (
      <>
      {searchHead}
        <ul className="index-list">
          {pl}
        </ul>
      </>
    )
  }
}


export default PlaylistIndex;
