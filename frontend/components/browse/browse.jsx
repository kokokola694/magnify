import React from 'react';
import SideBarContainer from './sidebar_container';
import { Route, Switch } from 'react-router-dom';
import PlaylistIndexContainer from '../playlists/playlist_index_container';
import AlbumIndexContainer from '../albums/album_index_container';
import ArtistIndexContainer from '../artists/artist_index_container';
import SongIndexContainer from '../songs/song_index_container';
import AlbumShowContainer from '../albums/album_show_container';
import ArtistShowContainer from '../artists/artist_show_container';
import PlaylistShowContainer from '../playlists/playlist_show_container';
import BrowseNavbarContainer from './browse_navbar_container';
import UserShowContainer from '../users/user_show_container';
import Featured from './featured';
import Player from '../player/player';


const Browse = () => {
  return (
    <section className="homepage">
      <Route path='/' component={SideBarContainer} />
      <Route path='/browse/:page' component={BrowseNavbarContainer}/>

      <main className="homepage-main">
        <Switch>
          <Route path='/browse/featured' component={Featured}/>
          <Route path='/browse/playlists/:playlistId' component={PlaylistShowContainer}/>
          <Route path='/browse/playlists' component={PlaylistIndexContainer}/>
          <Route path='/browse/albums/:albumId' component={AlbumShowContainer}/>
          <Route path='/browse/albums' component={AlbumIndexContainer}/>
          <Route path='/browse/artists/:artistId' component={ArtistShowContainer}/>
          <Route path='/browse/artists' component={ArtistIndexContainer}/>
          <Route path='/browse/songs' component={SongIndexContainer}/>
          <Route path='/browse/users/:userId' component={UserShowContainer}/>
        </Switch>

      </main>

    </section>
    )
}

export default Browse;
