import React from 'react';
import { connect } from 'react-redux';
import { fetchGenres } from '../../actions/genre_actions';
import AlbumIndexContainer from '../albums/album_index_container';

class GenreShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    this.props.fetchGenres();
  }


  render() {
    return (
      <>
        <AlbumIndexContainer />
      </>
    )
  }
}

const mdp = dispatch => {
  return {
    fetchGenres: () => dispatch(fetchGenres())
  }
}

export default connect(null, mdp)(GenreShow);
