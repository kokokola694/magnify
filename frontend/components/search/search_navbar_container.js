import React from 'react';
import SearchNavbar from './search_navbar';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const msp = (state, ownProps) => {
  const path = ownProps.location.pathname;
  const noNavBar = path.split('/')[2] === "recent";
  const input = path.split('/')[3];
  return {
    navType: "search",
    input,
    noNavBar
  }
}

export default withRouter(connect(msp, null)(SearchNavbar));
