import React from 'react';
import SongIndexContainer from '../songs/song_index_container';

class AlbumShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAlbum(this.props.match.params.albumId);
  }

  componentDidUpdate(oldProps) {
    if (oldProps.match.params.albumId !== this.props.match.params.albumId) {
      this.props.fetchAlbum(this.props.match.params.albumId);
    }
  }

  render () {
    return (
      <section>
        <img className="album-show-img" src={this.props.album.photoUrl}/>
        <SongIndexContainer album={this.props.album} songIds={this.props.album.song_ids}/>
      </section>
    )
  }
}

export default AlbumShow;
