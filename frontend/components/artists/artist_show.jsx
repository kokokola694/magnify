import React from 'react';
import ReactDOM from 'react-dom';
import SongIndexContainer from '../songs/song_index_container';
import AlbumIndexContainer from '../albums/album_index_container';

class ArtistShow extends React.Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
  }

  componentDidMount() {
    document.body.style.backgroundImage = "linear-gradient(#80495e, black)";
    ReactDOM.findDOMNode(this).scrollIntoView();
  }

  play() {
    const { clearQueue, addQueue, songs, fetchPlaySong } = this.props;
    clearQueue();
    addQueue(songs, this.shuffle(songs));
    fetchPlaySong(songs[0].id);
  }

  shuffle (songs) {
    const shuffledSongs = songs.slice(1);
    let currentIdx = shuffledSongs.length - 1;
    let randIdx;

    while (currentIdx >= 0) {
      randIdx = Math.floor(Math.random() * currentIdx);
      [shuffledSongs[currentIdx], shuffledSongs[randIdx]] =
        [shuffledSongs[randIdx], shuffledSongs[currentIdx]];
      currentIdx -= 1;
    }

    shuffledSongs.unshift(songs[0]);
    return shuffledSongs;
  };

  render () {
    const { savedIndicator, deleteSave, artist,
      currentUser, createSave } = this.props;

    const saveButton = savedIndicator ? (
      <button className="artist-save" onClick={() => deleteSave({
          savable_id: artist.id,
          savable_type: "Artist",
          saver_id: currentUser.id
        })}>
        Remove From Your Library</button>
    ) : (
      <button className="artist-save" onClick={() => createSave({
          savable_id: artist.id,
          savable_type: "Artist",
          saver_id: currentUser.id
        })}>
        Save To Your Library</button>
    );

    return (
      <section className="artist-show">
        <section className="artist-img-container">
          <section className="artist-show-head">
            <h1>{artist.name}</h1>
            <section className="artist-show-buttons">
              <button className="green-play" onClick={this.play}>Play</button>
              { saveButton }
            </section>
          </section>
          <img className="artist-show-img" src={artist.showPhotoUrl}/>
        </section>


        <main>
          <div>
            <h2 className="artist-show-sections">Popular</h2>
            <SongIndexContainer artist={artist}
              songIds={artist.song_ids}/>
          </div>
          <div>
            <h2 className="artist-show-sections">Albums</h2>
            <AlbumIndexContainer artist={artist}
              albumIds={artist.album_ids}/>
          </div>
        </main>
      </section>
    )
  }
}

export default ArtistShow;
