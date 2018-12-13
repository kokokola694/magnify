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
    const disp = (this.props.queueSongs.length === 0) ? (
      <div className="empty-queue">
        <p>Try playing a song!</p>
        <Link to='/browse/playlists'>Browse</Link>
      </div>
    ) : (
      <div>
        <h2 className="queue-sub">Now Playing</h2>
        <SongIndexContainer queueSongs={[this.props.queueSongs[0]]}/>
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
  const playSong = state.ui.player.playSong || {song: ""};
  const shuffled = state.ui.player.shuffled;
  const queue = !shuffled ? state.ui.player.queue : state.ui.player.shuffledQueue;
  const queueIds = queue.map(song => song.id);
  const playingSongIdx = queueIds.indexOf(playSong.song.id);
  const queueSongs = queue.slice(playingSongIdx);
  return {
    queueSongs,
    shuffled,
  }
}

const mdp = dispatch => {
  return {

  }
}

export default connect(msp, mdp)(Queue);
