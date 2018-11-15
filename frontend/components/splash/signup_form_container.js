import { connect } from 'react-redux';
import { login, signup } from '../../actions/session_actions';
import SessionForm from './session_form';

const msp = state => {
  return {
    errors: state.errors.session,
    formType: 'signup'
  }
}

const mdp = dispatch => {
  return {
    processForm: (user) => dispatch(signup(user)),
    demoLogin: (user) => dispatch(login(user))
  }
}

export default connect(msp, mdp)(SessionForm);
