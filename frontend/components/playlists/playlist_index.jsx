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
    const pl = this.props.playlists.map(p => <PlaylistIndexItem key={p.id} playlist={p}/>)
    return (
      <>
        <ul className="index-list">
          {pl}
        </ul>
      </>
    )
  }
}


export default PlaylistIndex;
