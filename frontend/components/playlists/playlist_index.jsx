import React from 'react';
import PlaylistIndexItem from './playlist_index_item';

class PlaylistIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPlaylists();
  }

  render() {
    // debugger
    const pl = this.props.playlists.map(p => <PlaylistIndexItem key={p.id} playlist={p}/>)
    return (
      <section>
        <h1>Playlists</h1>
        <ul className="index-list">
          {pl}
        </ul>
      </section>

    )
  }
}


export default PlaylistIndex;
