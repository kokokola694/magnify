import { connect } from 'react-redux';
import BrowseNavbar from './browse_navbar';
import { withRouter } from 'react-router-dom';
import React from 'react';

const msp = (state, ownProps) => {
  return {
    navType: "browse"
  }
}



export default withRouter(connect(msp, null)(BrowseNavbar));
