import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';
import UserShow from './user_show';
import { withRouter } from 'react-router';
import { followUser, unfollowUser } from '../../actions/user_actions';

const msp = (state, ownProps) => {
  return {
    user: state.entities.users[ownProps.match.params.userId],
    currentUser: state.entities.users[state.session.id]
  }
}

const mdp = dispatch => {
  return {
    fetchUser: (id) => dispatch(fetchUser(id)),
    followUser: (follow) => dispatch(followUser(follow)),
    unfollowUser: (follow) => dispatch(unfollowUser(follow)),
  }
}

export default withRouter(connect(msp, mdp)(UserShow));
