import React from 'react';
import SideBarContainer from '../browse/sidebar_container';
import { Route, Switch } from 'react-router-dom';
import PlaylistIndexContainer from '../playlists/playlist_index_container';
import AlbumIndexContainer from '../albums/album_index_container';
import ArtistIndexContainer from '../artists/artist_index_container';
import SongIndexContainer from '../songs/song_index_container';
import AlbumShowContainer from '../albums/album_show_container';
import ArtistShowContainer from '../artists/artist_show_container';
import PlaylistShowContainer from '../playlists/playlist_show_container';
import CollectionNavbarContainer from './collection_navbar_container';

const Collection = () => {
  return (
    <section className="homepage">
      <Route path='/' component={SideBarContainer} />
      <Route path='/collection/:page' component={CollectionNavbarContainer}/>

      <main className="homepage-main">
        <Switch>
          <Route path='/collection/playlists/:playlistId' component={PlaylistShowContainer}/>
          <Route path='/collection/playlists' component={PlaylistIndexContainer}/>
          <Route path='/collection/albums/:albumId' component={AlbumShowContainer}/>
          <Route path='/collection/albums' component={AlbumIndexContainer}/>
          <Route path='/collection/artists/:artistId' component={ArtistShowContainer}/>
          <Route path='/collection/artists' component={ArtistIndexContainer}/>
          <Route path='/collection/songs' component={SongIndexContainer}/>
        </Switch>

      </main>

    </section>
    )
}

export default Collection;
