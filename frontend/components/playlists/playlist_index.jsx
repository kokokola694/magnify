import React from 'react';
import PlaylistIndexItem from './playlist_index_item';

class PlaylistIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.body.style.backgroundImage = "linear-gradient(rgb(117, 78, 112), black)";
    this.props.fetchSongs();
    if (this.props.match.path.slice(0,11) === "/collection") {
      const playlistIds =
        this.props.currentUser.saved_playlist_ids.concat(this.props.currentUser.playlist_ids);
      this.props.fetchPlaylists(playlistIds);
    } else if (this.props.match.path.slice(0,7) === "/search") {
      this.props.searchPlaylists(this.props.input);
    } else if (this.props.match.path.slice(0,7) === "/browse") {
      this.props.fetchPlaylists();
    }
  }

  // componentDidUpdate(oldProps) {
  //   if (oldProps.playlists.length !== this.props.playlists.length) {
  //     this.props.fetchSongs();
  //     if (this.props.match.path.slice(0,11) === "/collection") {
  //       const playlistIds =
  //         this.props.currentUser.saved_playlist_ids.concat(this.props.currentUser.playlist_ids);
  //       this.props.fetchPlaylists(playlistIds);
  //     } else if (this.props.match.path.slice(0,7) === "/browse") {
  //       this.props.fetchPlaylists();
  //     }
  //   } else if (oldProps.location.pathname !== oldProps.location.pathname) {
  //     if (this.props.match.path.slice(0,7) === "/search") {
  //       this.props.searchPlaylists(this.props.input);
  //     }
  //   }
  // }

  render() {
    const songs = this.props.songs;
    const albums = this.props.albums;

    const pl = this.props.playlists.map(p => {
      const firstSong = songs.find(song => song.id == p.song_ids[0]);
      const photo = firstSong ?
        albums.find(album => album.id == firstSong.album_id).photoUrl :
        p.photoUrl;
      return ( <PlaylistIndexItem key={p.id} playlist={p} photoUrl={photo}/> );
    });

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
