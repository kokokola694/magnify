import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", demoClicked: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ clicked: true }, ()=> {
      const user = Object.assign({}, this.state);
      this.props.processForm(user);
    })

  }

  handleDemo (e) {
    e.preventDefault();
    if (!this.state.clicked) {
      const user = 'demo'.split('');
      const password = 'password'.split('');
      this.setState( {username: '', password: '', clicked: true}, () =>
        this.demoHelper(user, password)
      );
    }
  }

  demoHelper (user, password) {
    if (user.length > 0) {
      this.setState(
        { username: this.state.username + user.shift() }, () => {
          window.setTimeout( () => this.demoHelper(user, password), 45);
        }
      );
    } else if (password.length > 0) {
      this.setState(
        { password: this.state.password + password.shift() }, () => {
          window.setTimeout( () => this.demoHelper(user, password), 45);
        }
      );
    } else {
      this.props.demoLogin(this.state);
    }
  }

  update (field) {
    return (e) => this.setState({
      [field]: e.currentTarget.value
    });
  }

  render () {
    const loginPage = this.props.formType === "login";
    const submitButton = loginPage ? "Log In" : "Sign up"
    const otherLinkPath = loginPage ? "/signup" : "/login";
    const otherLinkVal = loginPage ? "Sign up" : "Log In";
    const otherLinkPretext = loginPage ?
      "Don't have an account?" : "Already have an account?";

    const errors = this.props.errors.map((err,i) => <li key={i}>{err}</li>);

    return (
      <div className="session-content">
        <header className="logo session-logo">
          <div id="favicon-session"></div>
          <Link to='/'>Magnify</Link></header>

        <button className="session-demo" onClick={this.handleDemo}>
          Demo Log In
        </button>
        <div className="session-demo-divider">
          <div className="session-demo-line"></div>
          <div className="session-demo-divider-text">or</div>
          <div className="session-demo-line"></div>
        </div>

        <ul className="session-errors">
          {errors}
        </ul>

        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.update("username")}
            value={this.state.username} placeholder="Username"/>
          <input type="password" onChange={this.update("password")}
            value={this.state.password} placeholder="Password"/>
          <input className="session-submit-button" id="session-submit"
            type="submit" value={submitButton}></input>
        </form>

        <div className="session-switch">
          <div className="session-bot-line"></div>
          <p>{otherLinkPretext}</p>
          <Link onClick={this.props.clearErrors} className="session-switch-link"
            to={otherLinkPath}>
            {otherLinkVal}
          </Link>
        </div>
      </div>
    )
  }
}

export default SessionForm;
