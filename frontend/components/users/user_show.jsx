import React from 'react';
import PlaylistIndexContainer from '../playlists/playlist_index_container';


class UserShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
  }

  componentDidUpdate(oldProps) {
    if (oldProps.match.params.userId !== this.props.match.params.userId) {
      this.props.fetchUser(this.props.match.params.userId);
    }
  }


  render () {
    const user = this.props.user || {photoUrl: "", username: ""};
    const following = this.props.currentUser.follows_user_ids.includes(user.id);
    const button = following ? (
      <button className="unfollow-user-btn" onClick={() => this.props.unfollowUser({
          followed_id: user.id,
          follower_id: this.props.currentUser.id
        })}>Unfollow</button>
    ) : (
      <button className="follow-user-btn" onClick={() => this.props.followUser({
          followed_id: user.id,
          follower_id: this.props.currentUser.id
        })}>Follow</button>
    )

    const ownPage = this.props.currentUser.id === user.id;
    const followButton = ownPage ? null : button;
    return (
      <section id="user-show">
        <header id="user-show-head">

          <img id="user-show-photo" src={user.photoUrl}/>
          <h1 id="user-show-name">{user.username}</h1>

          {followButton}

        </header>
        <main>
          <PlaylistIndexContainer />
        </main>
      </section>
    )
  }
}

export default UserShow;
