import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPlaySong } from '../../actions/player_actions';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      currentSong: null,
      currentPic: "",
      currentTitle: "",
      currentArtist: "",

      currentTime: "00:00",
      duration: "--:--",
      progress: "",
      playing: false,
      muted: false,
      volume: "100",
      index: 0
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
  }

  componentDidMount () {
    let player = this.player.current;
    player.controls = false;
    this.setCurrentAndDuration();
  }

  componentDidUpdate (oldProps) {
    let player = this.player.current;
    if (this.props.playSong && oldProps.playSong !== this.props.playSong) {
      const queueIdArray = this.props.queue.map(song => song.id);
      const index = queueIdArray.indexOf(this.props.playSong.song.id);
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
    if (player.ended) {
      this.nextSong();
    }
  }

  toProgress (e) {
    let player = this.player.current;
    let progress = this.progress.current;
    const pos = (e.pageX - progress.offsetLeft) / progress.offsetWidth;
    player.currentTime = pos * player.duration;
  }

  play () {
    let player = this.player.current;
    if (this.state.currentSong && (player.paused || player.ended)) {
      player.play();
      this.changeButton('play');
  	} else {
      player.pause();
      this.changeButton('pause');
    }
  }

  mute () {
    let player = this.player.current;
    player.muted = !player.muted;
    this.changeButton('mute');
  }

  changeButton (type) {
    if (type == 'play') {
      this.setState({playing: true});
    } else if (type == 'pause') {
      this.setState({playing: false});
    } else if (type == 'mute') {
      this.setState({ muted: !this.state.muted });
     }
  }

  nextSong () {
    const index = this.state.index + 1;
    if (index >= 0 && index < this.props.queue.length) {
      this.props.fetchPlaySong(this.props.queue[index].id)
      .then( () => this.setPlayerInfo(index))
    } else {
      this.setPlayerInfo(index);
      this.player.current.pause();
      this.player.current.currentTime = 0;
    }
  }

  prevSong () {
    const index = this.state.index - 1;
    if (index >= 0 && index < this.props.queue.length) {
      this.props.fetchPlaySong(this.props.queue[index].id)
      .then( () => this.setPlayerInfo(index))
    } else {
      this.setPlayerInfo(index);
      this.player.current.pause();
      this.player.current.currentTime = 0;
    }
  }

  slideVolume (e) {
    let player = this.player.current;
    player.volume = e.currentTarget.value/100;
    this.setState({volume: e.currentTarget.value})
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
    if (index >= 0 && index < this.props.queue.length) {
      this.setState({
        currentSong: this.props.playSong.song.audioUrl,
        currentTitle: this.props.playSong.song.title,
        currentArtist: this.props.playSong.artist.name,
        currentPic: this.props.playSong.album.photoUrl,
        index
      });
    } else {
      this.setState({
        currentSong: null, currentTitle: null, currentArtist: null,
        currentPic: null, index: 0, playing: false, duration: "--:--",
        progress: "",
      })
    }
  }

  render() {
    const playPauseButton = this.state.playing ? (
      <button onClick={() => this.play()} id="playpause"
        type="button" data-state="pause"></button>
    ) : (
      <button onClick={() => this.play()} id="playpause"
        type="button" data-state="play"></button>
    )

    const muteButton = this.state.muted ? (
      <button id="mute" onClick={() => this.mute()} type="button"
        data-state="unmute"></button>
    ) : (
      <button id="mute" onClick={() => this.mute()} type="button"
        data-state="mute"></button>
    )

    return (
      <section id="audioContainer">
        <audio id="audio" controls src={this.state.currentSong}
           preload="auto" onLoadedMetadata={() => this.onLoaded()}
           onTimeUpdate={() => this.updateProgress()} ref={this.player}></audio>
          <div id="audio-controls" className="controls" data-state="hidden">
            <section id="audio-controls-left">
              <img id="player-pic" src={this.state.currentPic}/>
              <div id="player-info">
                <h1>{this.state.currentTitle}</h1>
                <h3>{this.state.currentArtist}</h3>
              </div>
            </section>
            <section id="audio-controls-center">
              <section id="audio-controls-center-top">
                <button id="shuffle" type="button" data-state="shuffle"></button>
                <button id="previous" onClick={this.prevSong} type="button" data-state="previous"></button>
                {playPauseButton}
                <button id="next" onClick={this.nextSong} type="button" data-state="next"></button>
                <button id="repeat" type="button" data-state="repeat"></button>
              </section>
               <div className="progress" onClick={(e) => this.toProgress(e)}>
                 <h2>{this.state.currentTime}</h2>
                  <progress id="progress" ref={this.progress}  value="0" min="0">
                     <span id="progress-bar" ref={this.progressBar} ></span>
                  </progress>
                  <h2>{this.state.duration}</h2>
               </div>
             </section>
             <section id="audio-controls-right">
               {muteButton}
               <input id="vol" type="range" min="0" max="100" step="1" value={this.state.volume}
                 onChange={(e) => this.slideVolume(e)}  onInput={(e) => this.slideVolume(e)}/>
           </section>
          </div>
      </section>
    )
  }
}

const msp = (state, ownProps) => {
  return {
    playSong: state.ui.player.playSong,
    queue: state.ui.player.queue,

  }
}

const mdp = dispatch => {
  return {
    fetchPlaySong: (id) => dispatch(fetchPlaySong(id))
  }
}

export default connect(msp, mdp)(Player);
