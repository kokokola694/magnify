export const RECEIVE_ARTISTS = "RECEIVE_ARTISTS";
export const RECEIVE_ARTIST = "RECEIVE_ARTIST"
import * as ArtistApi from '../util/artist_api_util';

export const fetchArtists = () => dispatch => {
  return ArtistApi.fetchArtists()
  .then(artists => dispatch(receiveArtists(artists)))
}

export const fetchArtist = (id) => dispatch => {
  return ArtistApi.fetchArtist(id)
  .then(artist => dispatch(receiveArtist(artist)))
}


const receiveArtists = (artists) => {
  return {
    type: RECEIVE_ARTISTS,
    artists
  }
}

const receiveArtist = (artist) => {
  return {
    type: RECEIVE_ARTIST,
    artist
  }
}
