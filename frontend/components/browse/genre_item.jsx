import React from 'react';
import { Link } from 'react-router-dom';

export default ({genre, photoUrl}) => {
  const titles = {
    "kpop": "K-Pop",
    "jpop": "J-Pop",
    "pop": "Pop",
    "christian": "Christian",
    "rb": "R & B",
    "hip_hop": "Hip-Hop"
  };
  return (
    <li className="index-item">
      <Link to={`/browse/genres/${id}`}>
        <img className="index-item-img" src={photoUrl}/>
        <section>{}</section>
      </Link>
    </li>
  )
}
