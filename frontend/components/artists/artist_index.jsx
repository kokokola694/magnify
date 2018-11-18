import React from 'react';
import ArtistIndexItem from './artist_index_item';

class ArtistIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.match.path.slice(0,11) === "/collection") {
      this.props.fetchArtists(this.props.currentUser.saved_artist_ids);
    } else {
      this.props.fetchArtists();
    }
  }

  render() {
    const ar = this.props.artists.map(a => <ArtistIndexItem key={a.id} artist={a}/>)
    return (
      <>
        <ul className="index-list">
          {ar}
        </ul>
      </>

    )
  }
}


export default ArtistIndex;
