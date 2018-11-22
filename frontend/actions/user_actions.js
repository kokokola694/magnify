export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_FOLLOW = "RECEIVE_FOLLOW";
export const REMOVE_FOLLOW = "REMOVE_FOLLOW";
import * as UserApi from '../util/user_api_util';

export const fetchUser = id => dispatch => {
  return UserApi.fetchUser(id).then( user => dispatch(receiveUser(user)));
}

export const followUser = (follow) => dispatch => {
  return UserApi.followUser(follow).then( follow => dispatch(receiveFollow(follow)));
}

export const unfollowUser = (follow) => dispatch => {
  return UserApi.unfollowUser(follow).then( follow => dispatch(removeFollow(follow)));
}

const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    user
  }
}

const receiveFollow = follow => {
  return {
    type: RECEIVE_FOLLOW,
    followerId: follow.follower_id,
    followedId: follow.followed_id
  }
}

const removeFollow = follow => {
  return {
    type: REMOVE_FOLLOW,
    followerId: follow.follower_id,
    followedId: follow.followed_id
  }
}
