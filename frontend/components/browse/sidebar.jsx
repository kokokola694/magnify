import React from 'react';
import { NavLink } from 'react-router-dom';

class Sidebar extends React.Component {

  render() {
    return (
      <div className="side-bar">
        <section className="side-bar-top">
          <section className="side-bar-logo logo">magnify</section>
          <section className="side-bar-links">
            <section>
              <NavLink to="/search">
                <i className="material-icons">search</i>
                <div>Search</div>
              </NavLink>
            </section>
            <section>
              <NavLink to="/browse/playlists">
                <i className="material-icons">home</i>
                <div>Home</div>
              </NavLink>
            </section>
            <section>
              <NavLink to="/collection">
                <i className="material-icons">library_music</i>
                <div>Your Library</div>
              </NavLink>
            </section>
          </section>
        </section>

        <section className="side-bar-bottom">
          <section>{this.props.currentUser.username}</section>
          <button onClick={this.props.logout}>Log Out</button>
        </section>
      </div>
    )
  }
}

export default Sidebar;
