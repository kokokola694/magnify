import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';

const Auth = ({component: Component, path, loggedIn, exact}) => (
  <Route path={path} exact={exact} render={(props) => (
    !loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/browse/playlists" />
    )
  )}/>
);

const mapStateToProps = state => {
  return {loggedIn: Boolean(state.session.id)};
};

export default withRouter(connect(mapStateToProps, null)(Auth));
