export const RECEIVE_ALBUMS = "RECEIVE_ALBUMS";
export const RECEIVE_ALBUM = "RECEIVE_ALBUM"
import * as AlbumApi from '../util/album_api_util';

export const fetchAlbums = (ids) => dispatch => {
  return AlbumApi.fetchAlbums(ids)
  .then(albums => dispatch(receiveAlbums(albums)))
}

export const fetchAlbum = (id) => dispatch => {
  return AlbumApi.fetchAlbum(id)
  .then(album => dispatch(receiveAlbum(album)))
}

export const searchAlbums = (input) => dispatch => {
  return AlbumApi.searchAlbums(input)
  .then(albums => dispatch(receiveAlbums(albums)))
}


const receiveAlbums = ({albums, artists}) => {
  return {
    type: RECEIVE_ALBUMS,
    albums,
    artists
  }
}

const receiveAlbum = ({album, artist}) => {
  return {
    type: RECEIVE_ALBUM,
    album,
    artist
  }
}
