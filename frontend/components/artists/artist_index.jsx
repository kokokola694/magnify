import React from 'react';
import ArtistIndexItem from './artist_index_item';

class ArtistIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.body.style.backgroundImage = "linear-gradient(#80495e, black)";
    if (this.props.match.path.slice(0,11) === "/collection") {
      this.props.fetchArtists(this.props.currentUser.saved_artist_ids);
    } else if (this.props.match.path.slice(0,7) === "/search") {
      this.props.searchArtists(this.props.input);
    } else {
      this.props.fetchArtists();
    }
  }

  render() {
    const ar = this.props.artists.map(a => <ArtistIndexItem key={a.id} artist={a}/>)
    const arCount = ar.length;
    const searchHead = this.props.match.path.slice(0,15) === "/search/results" && arCount > 0 ? (
      <h1 className="search-headings">Artists</h1>
    ) : null;
    return (
      <>
        {searchHead}
        <ul className="index-list">
          {ar}
        </ul>
      </>

    )
  }
}


export default ArtistIndex;
