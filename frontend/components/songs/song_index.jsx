import React from 'react';
import SongIndexItem from './song_index_item';
import { openModal, closeModal } from '../../actions/modal_actions';


class SongIndex extends React.Component {
  constructor(props) {
    super(props);
    this.addQueue = this.addQueue.bind(this);
  }

  componentDidMount() {
    const pathArr = this.props.match.path.split('/');

    if (pathArr[1] === "queue") {
      // debugger
      this.props.fetchSongs(this.props.queue);
    } else if (pathArr[pathArr.length - 1] === "songs") {
      document.body.style.backgroundImage = "linear-gradient(#3c4758, black)";
      if (this.props.match.path.slice(0,11) === "/collection") {
        this.props.fetchSongs(this.props.currentUser.saved_song_ids);
      } else {
        this.props.fetchSongs();
      }
    } else if (this.props.match.params.albumId) {
      this.props.fetchAlbum(this.props.match.params.albumId)
      .then((action) => {
        this.props.fetchSongs(action.album.song_ids)
      });
    } else if (this.props.match.params.artistId) {
      this.props.fetchArtist(this.props.match.params.artistId)
      .then((action) => {
        this.props.fetchSongs(action.artist.song_ids)
      });
    } else if (this.props.match.params.playlistId) {
      this.props.fetchPlaylist(this.props.match.params.playlistId)
      .then((action) => {
        this.props.fetchSongs(action.playlist.song_ids)
      });
    } else if (this.props.match.path.slice(0,7) === "/search") {
      this.props.searchSongs(this.props.input);
    }
    // if (this.props.songIds) {
    //   this.props.fetchSongs(this.props.songIds);
    // } else if (this.props.match.params.playlistId) {
    //   this.props.fetchPlaylist(this.props.match.params.playlistId)
    //   .then(playlist => this.props.fetchSongs(playlist.song_ids))
  }

  componentDidUpdate (oldProps) {
    // debugger
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
    } else if (this.props.match.path.slice(0,7) === "/search" && this.props.location.pathname !== oldProps.location.pathname) {
      this.props.searchSongs(this.props.input);
    }
  }

  addQueue (song) {
    const songForQueue = [{
      title: song.title,
      audio: song.audioUrl,
      image: this.props.albums[song.album_id].photoUrl,
      artist: this.props.artists[song.artist_id].name
    }];
    this.props.receiveQueue(songForQueue);
  }

  render() {

    const pathArr = this.props.match.path.split('/');
    const songs = (pathArr[2] === "results") ? this.props.songs.slice(0,5) : this.props.songs
    const songlist =
      songs.map(s => <SongIndexItem key={s.id}
        song={s} playlist={this.props.playlist}
        openModal={openModal} queue={songs} addQueue={this.props.addQueue}
        fetchPlaySong={this.props.fetchPlaySong} playing={this.props.playing}
        playSongId={this.props.playSongId} pauseSong={this.props.pauseSong}
        resumeSong={this.props.resumeSong} clearQueue={this.props.clearQueue} />)



    return (
      <section>
        <ul className="song-index-list">
          {songlist}
        </ul>
      </section>

    )
  }
}


export default SongIndex;
