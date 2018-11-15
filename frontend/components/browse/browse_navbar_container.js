import { connect } from 'react-redux';
import BrowseNavbar from './browse_navbar';
import { withRouter } from 'react-router-dom';

const msp = (state, ownProps) => {
  return {
    navType: ownProps.match.url
  }
}

export default withRouter(connect(msp, null)(BrowseNavbar));
