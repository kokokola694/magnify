import React from 'react';
import PlaylistIndexItem from './playlist_index_item';

class PlaylistIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.match.path.slice(0,11) === "/collection") {
      this.props.fetchPlaylists(this.props.currentUser.saved_playlist_ids);
      this.props.fetchPlaylists(this.props.currentUser.playlist_ids);
    } else {
      this.props.fetchPlaylists();
    }
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
