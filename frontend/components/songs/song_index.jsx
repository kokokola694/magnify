import React from 'react';
import SongIndexItem from './song_index_item';
import { openModal, closeModal } from '../../actions/modal_actions';


class SongIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { fetchSongs, queue, currentUser, fetchAlbum,
      fetchArtist, fetchPlaylist } = this.props;

    const pathArr = this.props.match.path.split('/');
    const params = this.props.match.params;

    if (pathArr[1] === "queue") {
      fetchSongs(queue);

      // Either collection or browse page
    } else if (pathArr[pathArr.length - 1] === "songs") {
      document.body.style.backgroundImage = "linear-gradient(#3c4758, black)";

      if (this.props.match.path.slice(0,11) === "/collection") {
        fetchSongs(currentUser.saved_song_ids);
      } else {
        fetchSongs();
      }

      // Album, artist, playlist show pages
    } else if (params.albumId) {
      fetchAlbum(params.albumId)
      .then((payload) => fetchSongs(payload.album.song_ids));

    } else if (params.artistId) {
      fetchArtist(params.artistId)
      .then((payload) => fetchSongs(payload.artist.song_ids));

    } else if (params.playlistId) {
      fetchPlaylist(params.playlistId)
      .then((payload) => fetchSongs(payload.playlist.song_ids));
    }
  }

  componentDidUpdate (oldProps) {
    const pathArr = this.props.match.path.split('/');
    const params = this.props.match.params;
    const oldParams = oldProps.match.params;
    const { fetchSongs, queue, fetchPlaylist, fetchAlbum, fetchArtist } = this.props;

    if (pathArr[1] === "queue" && queue !== oldProps.queue) {
      fetchSongs(queue);

    } else if (oldParams.playlistId !== params.playlistId) {
      this.props.fetchPlaylist(params.playlistId)
      .then((payload) => fetchSongs(payload.playlist.song_ids));

    } else if (oldParams.albumId !== params.albumId) {
      fetchAlbum(params.albumId)
      .then((payload) => fetchSongs(payload.album.song_ids));

    } else if (oldParams.artistId !== params.artistId) {
      fetchArtist(params.artistId)
      .then((payload) => fetchSongs(payload.artist.song_ids));
    }
  }

  render() {
    const pathArr = this.props.match.path.split('/');
    const { songs, playlist, addQueue, fetchPlaySong, playing, pauseSong,
      resumeSong, clearQueue, playSongId } = this.props;

    // Search top results only shows 5 songs
    const updatedSongs = (pathArr[2] === "results") ?
      songs.slice(0,5) : songs;

    const songlist = updatedSongs.map( song =>
      <SongIndexItem
        key={song.id}
        song={song}
        playlist={playlist}
        openModal={openModal}
        queue={updatedSongs}
        addQueue={addQueue}
        fetchPlaySong={fetchPlaySong}
        playing={playing}
        playSongId={playSongId}
        pauseSong={pauseSong}
        resumeSong={resumeSong}
        clearQueue={clearQueue}
      />
    );

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
