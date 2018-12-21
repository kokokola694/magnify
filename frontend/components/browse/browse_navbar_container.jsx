import { connect } from 'react-redux';
import BrowseNavbar from './browse_navbar';
import { withRouter } from 'react-router-dom';
import React from 'react';

const msp = (state, ownProps) => {
  const path = ownProps.location.pathname;
  const noNavBar = path.split('/').length === 4;
  
  return {
    navType: "browse",
    noNavBar,
    openModal: (
      <div className="playlist-create"></div>
    )
  }
}



export default withRouter(connect(msp, null)(BrowseNavbar));
