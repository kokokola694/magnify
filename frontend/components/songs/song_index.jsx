import React from 'react';
import SongIndexItem from './song_index_item';

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
    const songlist = this.props.songs.map(s => <SongIndexItem key={s.id} song={s}/>)
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
