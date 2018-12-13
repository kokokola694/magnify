import React from 'react';
import PlaylistIndexContainer from '../playlists/playlist_index_container';
import AlbumIndexContainer from '../albums/album_index_container';
import ArtistIndexContainer from '../artists/artist_index_container';
import SongIndexContainer from '../songs/song_index_container';

export default () => {
  return (
    <div className="featured">
      <h1 className="featured-head">Get started with some featured albums!</h1>
      <AlbumIndexContainer />

      <h1 className="featured-head">Check out these artists!</h1>
      <ArtistIndexContainer />

      <h1 className="featured-head">Here are some cool playlists!</h1>
      <PlaylistIndexContainer />

    </div>
  )
}
