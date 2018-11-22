import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      currentSong: window.iuSong,
      currentPic: window.iuPic,
      currentTitle: "Through the Night",
      currentArtist: "IU",

      duration: "",
      progress: "",
      playing: false,
      muted: false,
      currentTime: "",
      volume: "100",

    });
    this.updateProgress = this.updateProgress.bind(this);
    this.play = this.play.bind(this);
    this.changeButtonState = this.changeButtonState.bind(this);
    this.toProgress = this.toProgress.bind(this);
    this.slideVolume = this.slideVolume.bind(this);
    this.onLoaded = this.onLoaded.bind(this);
    this.convertToMS = this.convertToMS.bind(this);
  }

  convertToMS (seconds) {
    let min = "0" + Math.floor(seconds / 60);
    let sec = "0" + Math.floor(seconds % 60);
    return min.substr(-2) + ":" + sec.substr(-2);
  }

  componentDidMount () {
    let player = this.refs.player;
    player.controls = false;
    const duration = this.convertToMS(player.duration);
    const currentTime = this.convertToMS(player.currentTime);
    this.setState({ duration, currentTime })
    const progress = document.getElementById('progress');
  }

  componentDidUpdate () {
    if (this.props.queue[0] && this.state.currentSong !== this.props.queue[0].audio) {
      let player = this.refs.player;
      this.setState({
        currentSong: this.props.queue[0].audio,
        currentTitle: this.props.queue[0].title,
        currentArtist: this.props.queue[0].artist,
        currentPic: this.props.queue[0].image,
      }, () => player.play());
      const duration = this.convertToMS(player.duration);
      const currentTime = this.convertToMS(player.currentTime);
      this.setState({ duration, currentTime })
      document.getElementById("playpause").setAttribute('data-state', 'pause');
    }
  }

  onLoaded () {
    let player = this.refs.player;
    const progress = document.getElementById('progress');
  	progress.setAttribute('max', player.duration);
    const duration = this.convertToMS(player.duration);
    const currentTime = this.convertToMS(player.currentTime);
    this.setState({ duration, currentTime })
  }

  updateProgress () {
    let player = this.refs.player;
    // const progress = (currentTime * 100) / player.duration;
    const progress = document.getElementById('progress');
    const progressBar = document.getElementById('progress-bar');
    progress.value = player.currentTime;
    progressBar.style.width = Math.floor((player.currentTime / player.duration) * 100) + '%';
    const currentTime = this.convertToMS(player.currentTime);
    this.setState({ currentTime })
  }

  toProgress (e) {
    let player = this.refs.player;
    const progress = document.getElementById('progress');
    const pos = (e.pageX - progress.offsetLeft) / progress.offsetWidth;
    player.currentTime = pos * player.duration;

  }

  play () {
    let player = this.refs.player;
    if (player.paused || player.ended) {
      player.play();
      this.changeButtonState('play');
  	} else {
      player.pause();
      this.changeButtonState('pause');
    }
  }

  mute () {
    let player = this.refs.player;
    player.muted = !player.muted;
    this.changeButtonState('mute');
  }

  changeButtonState (type) {
    if (type == 'play') {
      this.setState({playing: true});
      document.getElementById("playpause").setAttribute('data-state', 'pause');
    } else if (type == 'pause') {
      this.setState({playing: false});
      document.getElementById("playpause").setAttribute('data-state', 'play');
    } else if (type == 'mute') {
      this.setState({ muted: !this.state.muted });
      const val = this.state.muted ? 'mute' : 'unmute';
      document.getElementById("mute").setAttribute('data-state', `${val}`);
     }
  }

  slideVolume (e) {
    let player = this.refs.player;
    player.volume = e.currentTarget.value/100;
    this.setState({volume: e.currentTarget.value})
  }

  render() {
    return (
      <section id="audioContainer">
        <audio id="audio" controls src={this.state.currentSong}
           preload="auto" onLoadedMetadata={() => this.onLoaded()}
           onTimeUpdate={() => this.updateProgress()} ref="player"></audio>
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
                <button id="previous" type="button" data-state="previous"></button>
                <button onClick={() => this.play()} id="playpause"
                  type="button" data-state="play"></button>
                <button id="next" type="button" data-state="next"></button>
                <button id="repeat" type="button" data-state="repeat"></button>
              </section>
               <div className="progress">
                 <h2>{this.state.currentTime}</h2>
                  <progress id="progress" onClick={(e) => this.toProgress(e)} value="0" min="0">
                     <span id="progress-bar" style={{width: this.state.progress + '%'}}></span>
                  </progress>
                  <h2>{this.state.duration}</h2>
               </div>
             </section>
             <section id="audio-controls-right">
               <button id="mute" onClick={() => this.mute()} type="button"
                 data-state="mute"></button>
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
    queue: state.ui.queue
  }
}

export default connect(msp, null)(Player);
