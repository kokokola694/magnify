import { connect } from 'react-redux';
import Sidebar from './sidebar'

const msp = state => {
  return {
    currentUser: state.entities.users[state.session.id]
  }
}

const mdp = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(msp, mdp)(Sidebar);
