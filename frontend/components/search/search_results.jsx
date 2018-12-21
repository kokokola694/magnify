import PlaylistIndexContainer from '../playlists/playlist_index_container';
import SongIndexContainer from '../songs/song_index_container';
import ArtistIndexContainer from '../artists/artist_index_container';
import AlbumIndexContainer from '../albums/album_index_container';
import React from 'react';

export default () => {
  return (
    <>
      <SongIndexContainer />
      <ArtistIndexContainer />
      <AlbumIndexContainer />
      <PlaylistIndexContainer />
    </>
  )
}
