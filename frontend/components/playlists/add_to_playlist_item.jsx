import React from 'react';
import { addPlaylistSong } from '../../actions/playlist_actions';
import { withRouter } from 'react-router-dom';

class PlaylistIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { playlist, selectedSong, history, closeModal } = this.props;

    this.props.addToPlaylist({
      playlist_id: playlist.id,
      song_id: selectedSong.id
    }).then( playlistSong => history
      .push(`/browse/playlists/${playlistSong.playlistId}`))
      .then(() => closeModal())
  }

  render () {
    const { photoUrl, playlist } = this.props;

    return (
      <li className="index-item">
        <button onClick={() => this.handleClick()}>
          <img className="index-item-img" src={photoUrl}/>
          <section>{playlist.title}</section>
          <section>{playlist.author}</section>
        </button>
      </li>
    )
  }
}


export default withRouter(PlaylistIndexItem);
