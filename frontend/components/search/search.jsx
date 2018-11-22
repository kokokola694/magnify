import React from 'react';
import SideBarContainer from '../browse/sidebar_container';
import { Route, Switch } from 'react-router-dom';
import PlaylistIndexContainer from '../playlists/playlist_index_container';
import AlbumIndexContainer from '../albums/album_index_container';
import ArtistIndexContainer from '../artists/artist_index_container';
import SongIndexContainer from '../songs/song_index_container';
import Player from '../player/player';
import SearchNavbarContainer from './search_navbar_container';
import SearchResults from './search_results';


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({input: this.props.location.pathname.split('/')[3] || ""});
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput (e) {

    this.setState({input: e.currentTarget.value}, () => {
      this.props.history.push(`/search/results/${this.state.input}`);
    });
  }

  componentDidMount() {
    this.props.fetchPlaylists();
    // this.props.searchPlaylists(this.state.input);
    this.props.searchArtists(this.state.input);
    this.props.searchAlbums(this.state.input);
    this.props.searchSongs(this.state.input);
  }

  render () {
    const navPresent = this.props.location.pathname.split('/')[2] === "recent";
    const searchNav = navPresent ? null : (
      <Route path='/search/' component={SearchNavbarContainer}/>
    );
    return (
      <section className="homepage">
        <Route path='/' component={SideBarContainer} />

        <main className="homepage-main">
          <input className="search-bar" spellCheck="false" onChange={(e) => this.handleInput(e)} type="text" placeholder="Start typing..." value={this.state.input}/>
          <section className="search-main">
            {searchNav}
            <Switch>
              <Route path='/search/results/:input' component={SearchResults}/>
              <Route path='/search/songs/:input' component={SongIndexContainer}/>
              <Route path='/search/playlists/:input' component={PlaylistIndexContainer}/>
              <Route path='/search/albums/:input' component={AlbumIndexContainer}/>
              <Route path='/search/artists/:input' component={ArtistIndexContainer}/>
            </Switch>
          </section>
        </main>

      </section>
    )
  }


}

export default Search;
