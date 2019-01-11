export const RECEIVE_GENRES = "RECEIVE_GENRES";
export const RECEIVE_ALBUMS = "RECEIVE_ALBUMS"
import * as GenreApi from '../util/genre_api_util';

export const fetchGenres = () => dispatch => {
  return GenreApi.fetchGenres()
  .then(genres => dispatch(receiveGenres(genres)))
}

export const fetchGenre = (id) => dispatch => {
  return GenreApi.fetchGenre(id)
  .then(payload => dispatch(receiveAlbums(payload)))
}


const receiveGenres = (genres) => {
  return {
    type: RECEIVE_GENRES,
    genres
  }
}

const receiveAlbums = ({albums, artists}) => {
  return {
    type: RECEIVE_ALBUMS,
    albums,
    artists
  }
}
