import React from 'react';
import { NavLink, Link } from 'react-router-dom';

class Sidebar extends React.Component {


  render() {
    return (
      <div className="side-bar">
        <section className="side-bar-top">
          <section className="side-bar-logo logo">
            <section id="favicon"></section>
            Magnify</section>
          <section className="side-bar-links">
            <section>
              <NavLink to="/search/recent" isActive={this.props.atSearch}>
                <svg viewBox="0 0 512 512" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
                  <path d="M349.714 347.937l93.714 109.969-16.254
                     13.969-93.969-109.969q-48.508 36.825-109.207
                     36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476
                     14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476
                     14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73
                     71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286
                     21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254
                     21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286
                    80.254 21.461z" fill="currentColor">
                   </path></svg>
                <div>Search</div>
              </NavLink>
            </section>
            <section>
              <NavLink to="/browse/featured" isActive={this.props.atBrowse}>
                <svg viewBox="0 0 512 512" width="22" height="22"
                  xmlns="http://www.w3.org/2000/svg"><path d="M 256.274 60.84 L
                  84.324 166.237 L 84.324 443.063 L 193.27 443.063 L 193.27 293.73
                  L 320.228 293.73 L 320.228 443.063 L 428.222 443.063 L 428.222
                  165.476 L 256.274 60.84 Z M 256.274 35.95 L 448.452 149.145 L
                  448.452 464.395 L 300 464.395 L 300 315.062 L 213.499 315.062
                  L 213.499 464.395 L 64.095 464.395 L 64.095 150.161 L 256.274
                   35.95 Z" fill="currentColor"></path></svg>
                <div>Home</div>
              </NavLink>
            </section>
            <section>
              <NavLink to="/collection/playlists" isActive={this.props.atCollection}>
                <svg viewBox="0 0 512 512" width="22" height="22"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M311.873 77.46l166.349 373.587-39.111
                    17.27-166.349-373.587zM64
                    463.746v-384h42.666v384h-42.666zM170.667
                    463.746v-384h42.667v384h-42.666z" fill="currentColor"></path></svg>
                <div>Your Library</div>
              </NavLink>
            </section>
          </section>
        </section>

        <section className="side-bar-bottom">
          <section className="side-bar-line"></section>
          <Link to={`/browse/users/${this.props.currentUser.id}`} className="side-bar-current-user">
            <img className="side-bar-pic" src={this.props.currentUser.photoUrl}/>
            <section>{this.props.currentUser.username}</section>
          </Link>
          <button className="logout" onClick={this.props.logout}>Log Out</button>
        </section>
      </div>
    )
  }
}

export default Sidebar;
