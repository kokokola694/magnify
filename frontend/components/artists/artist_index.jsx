import React from 'react';
import ArtistIndexItem from './artist_index_item';

class ArtistIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchArtists();
  }

  render() {
    const ar = this.props.artists.map(a => <ArtistIndexItem key={a.id} artist={a}/>)
    return (
      <section>
        <ul className="index-list">
          {ar}
        </ul>
      </section>

    )
  }
}


export default ArtistIndex;
