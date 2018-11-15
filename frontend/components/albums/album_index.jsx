import React from 'react';
import AlbumIndexItem from './album_index_item';

class AlbumIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAlbums();
  }

  render() {
    const al = this.props.albums.map(a => <AlbumIndexItem key={a.id} album={a}/>)
    return (
      <section>
        <ul className="index-list">
          {al}
        </ul>
      </section>

    )
  }
}


export default AlbumIndex;
