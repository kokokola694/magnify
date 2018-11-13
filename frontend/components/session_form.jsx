import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  update(field) {
    return (e) => this.setState({
      [field]: e.currentTarget.value
    });
  }

  render () {
    const loginPage = this.props.formType === "login";
    const submitButton = loginPage ? "Log In" : "Sign up"
    const otherLinkPath = loginPage ? "/signup" : "/login";
    const otherLinkVal = loginPage ? "Sign up" : "Log In";
    return (
      <>
        <Link to={otherLinkPath}>{otherLinkVal} with Facebook</Link>
        <form onSubmit={this.handleSubmit}>
          <label> Username
            <input type="text" onChange={this.update("username")}
              value={this.state.username}/>
          </label>
          <label> Password
            <input type="password" onChange={this.update("password")}
              value={this.state.password}/>
          </label>
          <input type="submit" value={submitButton}></input>
        </form>
        <Link to={otherLinkPath}>{otherLinkVal}</Link>
      </>
    )
  }
}

export default SessionForm;
