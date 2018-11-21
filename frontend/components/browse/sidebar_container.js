import { connect } from 'react-redux';
import Sidebar from './sidebar'
import { logout } from '../../actions/session_actions';
import {withRouter} from 'react-router-dom';

const msp = (state, ownProps) => {
  const currentPathArray = ownProps.location.pathname.split('/');
  const atBrowse = () => currentPathArray[1] === "browse";
  const atCollection = () => currentPathArray[1] === "collection";
  const atSearch = () => currentPathArray[1] === "search";
  return {
    currentUser: state.entities.users[state.session.id],
    atBrowse,
    atCollection,
    atSearch
  }
}

const mdp = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default withRouter(connect(msp, mdp)(Sidebar));
