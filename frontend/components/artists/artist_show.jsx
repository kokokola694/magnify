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
      <section className="artist-show">
        <section className="artist-img-container">
          <section className="artist-show-head">
            <h1>{this.props.artist.name}</h1>
            <section className="artist-show-buttons">
              <button className="green-play">Play</button>
              <button className="artist-save">Save to your Library</button>
            </section>
          </section>
          <img className="artist-show-img" src={this.props.artist.photoUrl}/>

        </section>



        <SongIndexContainer artist={this.props.artist} songIds={this.props.artist.song_ids}/>
        <AlbumIndexContainer artist={this.props.artist} albumIds={this.props.artist.album_ids}/>
      </section>
    )
  }
}

export default ArtistShow;
