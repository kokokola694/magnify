import React from 'react';
import SongIndexContainer from '../songs/song_index_container';
import { Link } from 'react-router-dom';

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
    const artist = this.props.album.artist || {name: ""};
    return (
      <section>
        <img className="show-img" src={this.props.album.photoUrl}/>
        <h1>{this.props.album.title}</h1>
        <h2>By
          <Link to={`/browse/artists/${this.props.album.artist_id}`}>
            {artist.name}
          </Link>
        </h2>
        <SongIndexContainer album={this.props.album} songIds={this.props.album.song_ids}/>
      </section>
    )
  }
}

export default AlbumShow;
