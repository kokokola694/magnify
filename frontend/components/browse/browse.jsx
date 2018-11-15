import React from 'react';
import SideBarContainer from './sidebar_container';
import { Route, Switch } from 'react-router-dom';
import PlaylistIndexContainer from '../playlists/playlist_index_container';
import BrowseNavbarContainer from './browse_navbar_container';

// import BrowseAlbumContainer from './browse_album_container';
// import BrowseArtistContainer from './browse_artist_container';
// import BrowseSongContainer from './browse_song_container';

const Browse = () => {
  // <Switch>
  //   <Route path='/browse/playlists' container={BrowsePlaylistContainer}/>
  //   <Route path='/browse/albums' container={BrowseAlbumContainer}/>
  //   <Route path='/browse/artists' container={BrowseArtistContainer}/>
  //   <Route path='/browse/songs' container={BrowseSongContainer}/>
  // </Switch>
  return (
    <section className="homepage">
      <SideBarContainer />
      <BrowseNavbarContainer />
      <main className="homepage-main">
        <Route path='/browse/playlists' component={PlaylistIndexContainer}/>
        <Route path='/collection/playlists' component={PlaylistIndexContainer}/>
      </main>

    </section>
    )
}

export default Browse;
