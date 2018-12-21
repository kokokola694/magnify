import React from 'react';
import SongIndexItem from './song_index_item';
import { openModal, closeModal } from '../../actions/modal_actions';


class SongIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const pathArr = this.props.match.path.split('/');

    if (pathArr[1] === "queue") {
      this.props.fetchSongs(this.props.queue);

      // Either collection or browse page
    } else if (pathArr[pathArr.length - 1] === "songs") {
      document.body.style.backgroundImage = "linear-gradient(#3c4758, black)";
      if (this.props.match.path.slice(0,11) === "/collection") {
        this.props.fetchSongs(this.props.currentUser.saved_song_ids);
      } else {
        this.props.fetchSongs();
      }

    } else if (this.props.match.params.albumId) {
      this.props.fetchAlbum(this.props.match.params.albumId)
      .then((action) => this.props.fetchSongs(action.album.song_ids));

    } else if (this.props.match.params.artistId) {
      this.props.fetchArtist(this.props.match.params.artistId)
      .then((action) => this.props.fetchSongs(action.artist.song_ids));

    } else if (this.props.match.params.playlistId) {
      this.props.fetchPlaylist(this.props.match.params.playlistId)
      .then((action) => this.props.fetchSongs(action.playlist.song_ids));

    } else if (this.props.match.path.slice(0,7) === "/search") {
      this.props.searchSongs(this.props.input);
    }
  }

  componentDidUpdate (oldProps) {
    const pathArr = this.props.match.path.split('/');

    if (pathArr[1] === "queue" && this.props.queue !== oldProps.queue) {
      this.props.fetchSongs(this.props.queue);

    } else if (oldProps.match.params.playlistId !== this.props.match.params.playlistId) {
      this.props.fetchPlaylist(this.props.match.params.playlistId)
      .then((action) => this.props.fetchSongs(action.playlist.song_ids));

    } else if (oldProps.match.params.albumId !== this.props.match.params.albumId) {
      this.props.fetchAlbum(this.props.match.params.albumId)
      .then((action) => this.props.fetchSongs(action.album.song_ids));

    } else if (oldProps.match.params.artistId !== this.props.match.params.artistId) {
      this.props.fetchArtist(this.props.match.params.artistId)
      .then((action) => this.props.fetchSongs(action.artist.song_ids));

    } else if (this.props.match.path.slice(0,7) === "/search" &&
        this.props.location.pathname !== oldProps.location.pathname) {
      this.props.searchSongs(this.props.input);
    }
  }

  render() {
    const pathArr = this.props.match.path.split('/');

    // Search top results only shows 5 songs
    const songs = (pathArr[2] === "results") ?
      this.props.songs.slice(0,5) : this.props.songs;

    const songlist =
      songs.map( s => <SongIndexItem
        key={s.id}
        song={s}
        playlist={this.props.playlist}
        openModal={openModal}
        queue={songs}
        addQueue={this.props.addQueue}
        fetchPlaySong={this.props.fetchPlaySong}
        playing={this.props.playing}
        playSongId={this.props.playSongId}
        pauseSong={this.props.pauseSong}
        resumeSong={this.props.resumeSong}
        clearQueue={this.props.clearQueue} /> );

    return (
      <div>
        <ul className="song-index-list">
          {songlist}
        </ul>
      </div>
    )
  }
}


export default SongIndex;
