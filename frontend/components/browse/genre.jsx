import React from 'react';
import { connect } from 'react-redux';
import GenreItem from './genre_item';
import { fetchGenres } from '../../actions/genre_actions';

class Genre extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchGenres();
  }

  render() {
    const genreList = this.props.genres.map((genre, i) => {
      return (
        <GenreItem key={i} genre={genre} photoUrl={genre.photoUrl}/>)
    })

    return (
      <div className="genre">
        <h1 className="featured-head">Genres & Moods</h1>
        <ul className="index-list">
          {genreList}
        </ul>
      </div>
    )
  }


}

const msp = state => {
  return {
    genres: Object.values(state.entities.genres)
  }
}

const mdp = dispatch => {
  return {
    fetchGenres: () => dispatch(fetchGenres())
  }
}

export default connect(msp, mdp)(Genre);
