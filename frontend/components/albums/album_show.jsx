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
    const saveButton = this.props.savedIndicator ? (
      <button onClick={() => this.props.deleteSave({
          savable_id: this.props.album.id,
          savable_type: "Album",
          saver_id: this.props.currentUser.id
        })}>
        Remove From Your Library</button>
    ) : (
      <button onClick={() => this.props.createSave({
          savable_id: this.props.album.id,
          savable_type: "Album",
          saver_id: this.props.currentUser.id
        })}>
        Save To Your Library</button>
    );


    return (
      <section>
        <img className="show-img" src={this.props.album.photoUrl}/>
        <h1>{this.props.album.title}</h1>
        <h2>By
          <Link to={`/browse/artists/${this.props.album.artist_id}`}>
            {artist.name}
          </Link>
        </h2>
        <section>
          <button>Play</button>
          {saveButton}
        </section>
        <SongIndexContainer album={this.props.album} songIds={this.props.album.song_ids}/>
      </section>
    )
  }
}

export default AlbumShow;
