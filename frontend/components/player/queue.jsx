import React from 'react';
import { connect } from 'react-redux';
import SongIndexContainer from '../songs/song_index_container';
import SideBarContainer from '../browse/sidebar_container';
import { Route, Switch, Link } from 'react-router-dom';

class Queue extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.body.style.backgroundImage = "linear-gradient(rgb(60, 88, 70), black)";
  }

  render () {
    const nextSongs = this.props.next.length === 0 ? null : (
      <>
        <h2 className="queue-sub">Next in Queue</h2>
        <SongIndexContainer queueSongs={this.props.next}/>
      </>
    )

    const disp = (this.props.queueSongs.length === 0) ? (
      <div className="empty-queue">
        <p>Try playing a song!</p>
        <Link to='/browse/playlists'>Browse</Link>
      </div>
    ) : (
      <div>
        <h2 className="queue-sub">Now Playing</h2>
        <SongIndexContainer queueSongs={[this.props.queueSongs[0]]}/>
        { nextSongs }
        <h2 className="queue-sub">Next Up</h2>
        <SongIndexContainer queueSongs={this.props.queueSongs.slice(1)}/>
      </div>
    )

    return (
      <section className="homepage">
        <Route path='/' component={SideBarContainer} />
        <div className="homepage-main queue">
            <h1 id="queue-head">Play Queue</h1>
            {disp}
        </div>
      </section>
    )
  }
}

const msp = state => {
  let { playSong, shuffled, queue, shuffledQueue, next } = state.ui.player;

  playSong = playSong || {song: ""};
  const updatedQueue = !shuffled ? queue : shuffledQueue;
  const queueIds = updatedQueue.map(song => song.id);
  const playingSongIdx = queueIds.indexOf(playSong.song.id);
  const queueSongs = updatedQueue.slice(playingSongIdx);

  return {
    queueSongs,
    shuffled,
    next
  }
}

export default connect(msp, null)(Queue);
