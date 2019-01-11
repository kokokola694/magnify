import React from 'react';
import ReactDOM from 'react-dom';
import SongIndexContainer from '../songs/song_index_container';
import { Link } from 'react-router-dom';

class AlbumShow extends React.Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
  }

  componentDidMount() {
    document.body.style.backgroundImage = "linear-gradient(rgb(68, 52, 84), black)";
    ReactDOM.findDOMNode(this).scrollIntoView();
  }

  componentDidUpdate (oldProps) {
    const oldParams = oldProps.match.params;
    const params = this.props.match.params;
    if (oldParams.albumId !== params.albumId) {
      const { fetchSongs, fetchAlbum } = this.props;
      fetchAlbum(params.albumId).then((payload) =>
        fetchSongs(payload.album.song_ids));
      }
  }

  play() {
    const { clearQueue, addQueue, fetchPlaySong, songs } = this.props;
    clearQueue();
    addQueue(songs, this.shuffle(songs))
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
    const { savedIndicator, deleteSave, currentUser,
      createSave, album } = this.props;

    const artist = album.artist || {name: ""};
    const saveButton = savedIndicator ? (
      <button className="show-save" onClick={() => deleteSave({
          savable_id: album.id,
          savable_type: "Album",
          saver_id: currentUser.id
        })}>
        Remove From Your Library</button>
    ) : (
      <button className="show-save" onClick={() => createSave({
          savable_id: album.id,
          savable_type: "Album",
          saver_id: currentUser.id
        })}>
        Save To Your Library</button>
    );

    const albumSongs = album.song_ids || { length: "" };
    const pluralSongs = albumSongs.length === 1 ? "Song" : "Songs";

    return (
      <section className="show">
        <header>
          <img className="show-img" src={album.photoUrl}/>
          <section className="show-info">
            <div className="show-title-author">
              <h1>{album.title}</h1>
              <h2>
                <Link to={`/browse/artists/${album.artist_id}`}>
                  {artist.name}
                </Link>
              </h2>
            </div>
            <section className="show-play-length">
              <button onClick={this.play} className="green-play">Play</button>
              <div className="album-year-songs">
                <h3>{album.year}</h3>
                <h3 className="middot">&middot;</h3>
                <h3>{albumSongs.length} {pluralSongs}</h3>
              </div>

            </section>
            {saveButton}
          </section>
        </header>
        <main>
          <SongIndexContainer
            album={album}
            albumSongIds={album.song_ids}
          />
        </main>
      </section>
    )
  }
}

export default AlbumShow;
