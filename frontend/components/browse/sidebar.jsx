import React from 'react';
import { NavLink } from 'react-router-dom';

class Sidebar extends React.Component {

  render() {
    return (
      <div className="side-bar-session">
        <section className="side-bar-logo logo">magnify</section>
        <section className="side-bar-links">
          <section>Search</section>
          <section>Home</section>
          <section>Library</section>
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
