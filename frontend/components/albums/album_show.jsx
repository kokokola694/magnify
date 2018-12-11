import React from 'react';
import SongIndexContainer from '../songs/song_index_container';
import { Link } from 'react-router-dom';

class AlbumShow extends React.Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
  }

  componentDidMount() {
    document.body.style.backgroundImage = "linear-gradient(rgb(68, 52, 84), black)";
    // this.props.fetchAlbum(this.props.match.params.albumId);
  }

  componentDidUpdate(oldProps) {
    // if (oldProps.match.params.albumId !== this.props.match.params.albumId) {
    //   this.props.fetchAlbum(this.props.match.params.albumId);
    // }
  }

  play() {
    const songIds = this.props.album.song_ids;
    this.props.fetchSongs(songIds)
    .then(songs => this.props.addQueue(Object.values(songs.songs), this.shuffle(Object.values(songs.songs))))
    .then(() => this.props.fetchPlaySong(songIds[0]))
  }

  shuffle (songs) {
    let currentIdx = songs.length - 1;
    let randIdx;
    while (currentIdx >= 0) {
      randIdx = Math.floor(Math.random() * currentIdx);
      [songs[currentIdx], songs[randIdx]] = [songs[randIdx], songs[currentIdx]];
      currentIdx -= 1;
    }
    return songs;
  };

  render () {
    const artist = this.props.album.artist || {name: ""};
    const saveButton = this.props.savedIndicator ? (
      <button className="show-save" onClick={() => this.props.deleteSave({
          savable_id: this.props.album.id,
          savable_type: "Album",
          saver_id: this.props.currentUser.id
        })}>
        Remove From Your Library</button>
    ) : (
      <button className="show-save" onClick={() => this.props.createSave({
          savable_id: this.props.album.id,
          savable_type: "Album",
          saver_id: this.props.currentUser.id
        })}>
        Save To Your Library</button>
    );

    const albumSongs = this.props.album.song_ids || {length: ""};
    const plural = albumSongs.length === 1 ? "Song" : "Songs";


    return (
      <section className="show">
        <header>
          <img className="show-img" src={this.props.album.photoUrl}/>
          <section className="show-info">
            <div className="show-title-author">
              <h1>{this.props.album.title}</h1>
              <h2>
                <Link to={`/browse/artists/${this.props.album.artist_id}`}>
                  {artist.name}
                </Link>
              </h2>
            </div>
            <section className="show-play-length">
              <button onClick={this.play} className="green-play">Play</button>
              <div className="album-year-songs">
                <h3>{this.props.album.year}</h3>
                <h3 className="middot">&middot;</h3>
                <h3>{albumSongs.length} {plural}</h3>
              </div>

            </section>
            {saveButton}
          </section>
        </header>
        <main>
          <SongIndexContainer album={this.props.album} albumSongIds={this.props.album.song_ids}/>
        </main>
      </section>
    )
  }
}

export default AlbumShow;
