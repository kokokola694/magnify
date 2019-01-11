import React from 'react';
import GenreItem from './genre_item';

export default () => {
  const genreList = ["kpop", "pop", "jpop", "christian", "rb", "hip_hop"];
  const genres = genreList.map((genre, i) =>
    <GenreItem key={i} genre={genre}/>);

  return (
    <div className="genre">
      <h1 className="genre-head">Genres</h1>
      <ul className="genre-list">
        {genres}
      </ul>
    </div>
  )
}
