import React from 'react';
import SongIndexContainer from '../songs/song_index_container';
import AlbumIndexContainer from '../albums/album_index_container';

class ArtistShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchArtist(this.props.match.params.artistId);
  }

  componentDidUpdate(oldProps) {
    if (oldProps.match.params.artistId !== this.props.match.params.artistId) {
      this.props.fetchArtist(this.props.match.params.artistId);
    }
  }

  render () {
    return (
      <section>
        <section className="artist-img-container">
          <img className="artist-show-img" src={this.props.artist.photoUrl}/>
          <div className="gradient"></div>
        </section>

        <SongIndexContainer artist={this.props.artist} songIds={this.props.artist.song_ids}/>
        <AlbumIndexContainer artist={this.props.artist} albumIds={this.props.artist.album_ids}/>
      </section>
    )
  }
}

export default ArtistShow;
