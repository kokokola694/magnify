import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, NavLink } from 'react-router-dom';
import Queue from './queue';
import {  fetchPlaySong, pauseSong, resumeSong,
  shuffle, clearQueue } from '../../actions/player_actions';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      currentSong: null, currentPic: "", currentTitle: "",
      currentArtist: "", currentTime: "00:00", duration: "--:--",
      muted: false, volume: "100", index: 0, repeat: "none"
    });

    this.player = React.createRef();
    this.progress = React.createRef();
    this.progressBar = React.createRef();

    this.setCurrentAndDuration = this.setCurrentAndDuration.bind(this);
    this.setPlayerInfo = this.setPlayerInfo.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
    this.play = this.play.bind(this);
    this.changeButton = this.changeButton.bind(this);
    this.slideVolume = this.slideVolume.bind(this);
    this.onLoaded = this.onLoaded.bind(this);
    this.nextSong = this.nextSong.bind(this);
    this.prevSong = this.prevSong.bind(this);
    this.toggleRepeat = this.toggleRepeat.bind(this);
    this.toggleShuffle = this.toggleShuffle.bind(this);
  }

  componentDidMount () {
    let player = this.player.current;
    player.controls = false;
    this.setCurrentAndDuration();
  }

  componentDidUpdate (oldProps) {
    let player = this.player.current;
    const { shuffled, shuffledQueue, queue, playSong } = this.props;
    const updatedQueue = shuffled ? shuffledQueue : queue;
    if (playSong && oldProps.playSong !== playSong) {
        const queueIdArray = updatedQueue.map(song => song.id);
        const index = queueIdArray.indexOf(playSong.song.id);
        this.setPlayerInfo(index);
    }
  }

  onLoaded () {
    let player = this.player.current;
    let progress = this.progress.current;
  	progress.setAttribute('max', player.duration);
    this.setCurrentAndDuration();
    this.play();
  }

  updateProgress () {
    let player = this.player.current;
    let progress = this.progress.current;
    let progressBar = this.progressBar.current;

    progress.value = player.currentTime;
    progressBar.style.width = Math.floor((player.currentTime / player.duration) * 100) + '%';
    const currentTime = this.convertToMS(player.currentTime);
    this.setState({ currentTime });
    if (player.ended) this.nextSong();
  }

  toProgress (e) {
    if (!this.state.currentSong) return;
    let player = this.player.current;
    if (player.currentTime) {
      let progress = this.progress.current;
      const pos = (e.pageX - progress.offsetLeft) / progress.offsetWidth;
      player.currentTime = pos * player.duration;
    }
  }

  play () {
    let player = this.player.current;
    if (this.state.currentSong) {
      const action = player.paused || player.ended ? "play" : "pause";
      player[action]();
      this.changeButton(action);
  	}
  }

  mute () {
    let player = this.player.current;
    player.muted = !player.muted;
    this.changeButton('mute');
  }

  changeButton (type) {
    if (type == 'mute') {
      this.setState({ muted: !this.state.muted });
    } else if (!this.state.currentSong) {
      return;
    } else if (type == 'play' && !this.props.playing) {
      this.props.resumeSong();
    } else if (type == 'pause' && this.props.playing) {
      this.props.pauseSong();
    }
  }

  nextSong () {
    let player = this.player.current;
    const { repeat } = this.state;
    const { queue, playing, shuffled, shuffledQueue, fetchPlaySong } = this.props;

    if (this.state.repeat === "one" || (repeat === "all" && queue.length === 1)) {
      player.currentTime = 0;
      if (player.paused && playing) player.play();
    } else {
      let index = this.state.index + 1;
      const updatedQueue = shuffled ? shuffledQueue : queue;
      if (repeat === "all" && index === updatedQueue.length ) index = 0;
      if (index >= 0 && index < updatedQueue.length) {
        fetchPlaySong(updatedQueue[index].id).then( () => this.setPlayerInfo(index))
      } else {
        this.setPlayerInfo(index);
        player.pause();
        player.currentTime = 0;
      }
    }
  }

  prevSong () {
    let player = this.player.current;
    const { queue, shuffled, shuffledQueue, fetchPlaySong } = this.props;

    if (player.currentTime > 5) {
      player.currentTime = 0;
      return;
    }
    const index = this.state.index - 1;
    const updatedQueue = shuffled ? shuffledQueue : queue;
    fetchPlaySong(updatedQueue[index].id).then( () => this.setPlayerInfo(index) )
  }

  slideVolume (e) {
    let player = this.player.current;
    player.volume = e.currentTarget.value/100;
    this.setState({volume: e.currentTarget.value})
  }

  toggleShuffle () {
    this.props.shuffle();
  }

  toggleRepeat () {
    let nextState; this.state.repeat === "none" ? "one" : "none";
    if (this.state.repeat === "none") {
      nextState = "all";
    } else if (this.state.repeat === "all") {
      nextState = "one";
    } else {
      nextState = "none";
    }
    this.setState({repeat: nextState});
  }

  // Helper methods
  convertToMS (seconds) {
    let min = "0" + Math.floor(seconds / 60);
    let sec = "0" + Math.floor(seconds % 60);
    return min.substr(-2) + ":" + sec.substr(-2);
  }

  setCurrentAndDuration () {
    let player = this.player.current;
    if (this.state.currentSong) {
      const duration = this.convertToMS(player.duration);
      const currentTime = this.convertToMS(player.currentTime);
      this.setState({ duration, currentTime });
    }
  }

  setPlayerInfo (index) {
    const { shuffled, shuffledQueue, queue, clearQueue, playSong } = this.props;
    const updatedQueue = shuffled ? shuffledQueue : queue;
    if (index < 0 || index >= updatedQueue.length) {
      clearQueue();
      this.setState({
        currentSong: null, currentTitle: null, currentArtist: null,
        currentPic: null, index: 0, duration: "--:--",
        progress: "",
      })
    } else {
      this.setState({
        currentSong: playSong.song.audioUrl,
        currentTitle: playSong.song.title,
        currentArtist: playSong.artist.name,
        currentPic: playSong.album.photoUrl,
        index
      });
    }
  }

  render() {
    const { playing, playSong, shuffled, shuffle } = this.props;
    const { muted, index, repeat, currentSong,
      currentPic, currentTitle, currentArtist,
      currentTime, duration, volume } = this.state;

    const playPauseButton = playing ? (
      <button onClick={() => this.play()} id="playpause"
        type="button" data-state="pause"></button>
    ) : (
      <button onClick={() => this.play()} id="playpause"
        type="button" data-state="play"></button>
    )

    const muteButton = muted ? (
      <button id="mute" onClick={() => this.mute()} type="button"
        data-state="unmute"></button>
    ) : (
      <button id="mute" onClick={() => this.mute()} type="button"
        data-state="mute"></button>
    )

    const prevButton = index === 0 ? (
      <button id="previous-null" type="button" data-state="previous"></button>
    ) : (
      <button id="previous" onClick={this.prevSong} type="button" data-state="previous"></button>
    );

    const nextButton = !playSong ? (
      <button id="next-null" type="button" data-state="next"></button>
    ) : (
      <button id="next" onClick={this.nextSong} type="button" data-state="next"></button>
    );

    const shuffleButton = shuffled ? (
      <button id="unshuffle" onClick={shuffle} type="button"></button>
    ) : (
      <button id="shuffle" onClick={shuffle} type="button"></button>
    )

    let repeatButton;
    if (repeat === "none") {
      repeatButton = (
        <button id="repeat" onClick={this.toggleRepeat} type="button"></button>
      )
    } else if (repeat === "one") {
      repeatButton = (
        <button id="repeatone" onClick={this.toggleRepeat} type="button"></button>
      )
    } else {
      repeatButton = (
        <button id="repeatall" onClick={this.toggleRepeat} type="button"></button>
      )
    }

    const onQueuePage = this.props.location.pathname === "/queue";

    const queueButton = onQueuePage ? (
      <NavLink to='/browse/featured'>
        <section id="queue-icon-green"></section>
      </NavLink>
    ) : (
      <NavLink to='/queue'>
        <section id="queue-icon"></section>
      </NavLink>
    )

    return (
      <section id="audioContainer">
        <audio id="audio" controls src={currentSong}
           preload="auto" onLoadedMetadata={() => this.onLoaded()}
           onTimeUpdate={() => this.updateProgress()} ref={this.player}></audio>

          <div id="mobile-controls"> TEST </div>
          <div id="audio-controls" className="controls" data-state="hidden">
            <section id="audio-controls-left">
              <img id="player-pic" src={currentPic}/>
              <div id="player-info">
                <h1>{currentTitle}</h1>
                <h3>{currentArtist}</h3>
              </div>
            </section>
            <section id="audio-controls-center">
              <section id="audio-controls-center-top">
                {shuffleButton}
                {prevButton}
                {playPauseButton}
                {nextButton}
                {repeatButton}
            </section>

               <div className="progress">
                 <h2 className="timestamps">{currentTime}</h2>
                  <progress id="progress" ref={this.progress}
                    onClick={(e) => this.toProgress(e)}  value="0" min="0">
                     <span id="progress-bar" ref={this.progressBar} ></span>
                  </progress>
                  <h2 className="timestamps">{duration}</h2>
               </div>
             </section>
             <section id="audio-controls-right">
               {queueButton}
               {muteButton}
               <input id="vol" type="range" min="0" max="100" step="1" value={volume}
                 onChange={(e) => this.slideVolume(e)}  onInput={(e) => this.slideVolume(e)}/>
           </section>
          </div>
      </section>
    )
  }
}

const msp = (state, ownProps) => {
  const { playSong, queue, shuffledQueue, playing, shuffled } = state.ui.player;
  return {
    playSong,
    queue,
    shuffledQueue,
    playing,
    shuffled
  }
}

const mdp = dispatch => {
  return {
    fetchPlaySong: (id) => dispatch(fetchPlaySong(id)),
    resumeSong: () => dispatch(resumeSong()),
    pauseSong: () => dispatch(pauseSong()),
    clearQueue: () => dispatch(clearQueue()),
    shuffle: () => dispatch(shuffle())
  }
}

export default withRouter(connect(msp, mdp)(Player));
