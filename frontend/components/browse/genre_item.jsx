import React from 'react';
import { Link } from 'react-router-dom';

export default ({genre, photoUrl}) => {
  return (
    <li className="index-item">
      <Link to={`/browse/genres/${genre.id}`}>
        <img className="index-item-img" src={photoUrl}/>
        <section>{genre.name}</section>
      </Link>
    </li>
  )
}
