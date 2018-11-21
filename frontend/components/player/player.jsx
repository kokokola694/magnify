import React from 'react';
import { connect } from 'react-redux';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      currentSong: window.iuSong
    })
  }

  render() {
    return (
      <section id="player">
        <audio controls src={this.state.currentSong} preload="auto" ref="player"></audio>
      </section>
    )
  }
}

const msp = (state, ownProps) => {
  return {

  }
}

const mdp = dispatch => {
  return {

  }
}

export default connect(msp, mdp)(Player);
