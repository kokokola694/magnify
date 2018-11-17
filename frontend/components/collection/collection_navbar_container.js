import { connect } from 'react-redux';
import BrowseNavbar from '../browse/browse_navbar';
import { withRouter } from 'react-router-dom';

const msp = (state, ownProps) => {
  return {
    navType: "collection"
  }
}

export default withRouter(connect(msp, null)(BrowseNavbar));
