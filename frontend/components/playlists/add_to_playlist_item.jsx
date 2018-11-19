import React from 'react';
import { addPlaylistSong } from '../../actions/playlist_actions';
// import { Link } from 'react-router-dom';

class PlaylistIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.addToPlaylist({playlist_id: this.props.playlist.id, song_id: this.props.selectedSong.id})
    .then(() => this.props.closeModal())
  }

  render () {
    return (
      <li className="index-item">
        <button onClick={() => this.handleClick()}>
          <img className="index-item-img" src={this.props.playlist.photoUrl}/>
          <section>{this.props.playlist.title}</section>
          <section>{this.props.playlist.author}</section>
        </button>
      </li>
    )
  }
}



export default PlaylistIndexItem;
