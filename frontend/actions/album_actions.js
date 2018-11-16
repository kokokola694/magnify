export const RECEIVE_ALBUMS = "RECEIVE_ALBUMS";
export const RECEIVE_ALBUM = "RECEIVE_ALBUM"
import * as AlbumApi from '../util/album_api_util';

export const fetchAlbums = () => dispatch => {
  return AlbumApi.fetchAlbums()
  .then(albums => dispatch(receiveAlbums(albums)))
}

export const fetchAlbum = (id) => dispatch => {
  return AlbumApi.fetchAlbum(id)
  .then(album => dispatch(receiveAlbum(album)))
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
