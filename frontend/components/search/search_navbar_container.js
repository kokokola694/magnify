import { connect } from 'react-redux';
import SearchNavbar from './search_navbar';
import { withRouter } from 'react-router-dom';
import React from 'react';

const msp = (state, ownProps) => {
  const path = ownProps.location.pathname;
  const noNavBar = path.split('/')[2] === "recent";
  const input = ownProps.location.pathname.split('/')[3];
  return {
    navType: "search",
    input,
    noNavBar
  }
}

const mdp = dispatch => {
  return {
  }
}

export default withRouter(connect(msp, mdp)(SearchNavbar));
