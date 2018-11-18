import React from 'react';
import SongIndexItem from './song_index_item';
import { openModal, closeModal } from '../../actions/modal_actions';


class SongIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.songIds) {
      this.props.fetchSongs(this.props.songIds);
    } else {
      this.props.fetchSongs();
    }
  }

  componentDidUpdate() {

  }

  render() {
    const songlist = this.props.songs.map(s => <SongIndexItem key={s.id} song={s} openModal={openModal}/>)
    return (
      <section>
        <ul className="playlist-index-list">
          {songlist}
        </ul>
      </section>

    )
  }
}


export default SongIndex;
