import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  handleDemo (e) {
    e.preventDefault();
    const user = 'demo'.split('');
    const password = 'password'.split('');
    this.setState( {username: '', password: ''}, () =>
      this.demoHelper(user, password)
    );
  }

  demoHelper (user, password) {
    if (user.length > 0) {
      this.setState(
        { username: this.state.username + user.shift() }, () => {
          window.setTimeout( () =>
            this.demoHelper(user, password), 45);
        }
      );
    } else if (password.length > 0) {
      this.setState(
        { password: this.state.password + password.shift() }, () => {
          window.setTimeout( () =>
            this.demoHelper(user, password), 45);
        }
      );
    } else {
      this.props.demoLogin(this.state);
    }
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
    const otherLinkPretext = loginPage ? "Don't have an account?" : "Already have an account?";

    const errors = this.props.errors.map((err,i) => <li key={i}>{err}</li>);

    return (
      <section className="session-content">
        <header className="logo session-logo"><Link to='/'>Magnify</Link></header>

        <button className="session-demo" onClick={this.handleDemo}>Demo Log In</button>
        <section className="session-demo-divider">
          <section className="session-demo-line"></section>
          <section className="session-demo-divider-text">or</section>
          <section className="session-demo-line"></section>
        </section>

        <ul className="session-errors">
          {errors}
        </ul>

        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.update("username")}
            value={this.state.username} placeholder="Username"/>
          <input type="password" onChange={this.update("password")}
            value={this.state.password} placeholder="Password"/>
          <input className="session-submit-button" id="session-submit" type="submit" value={submitButton}></input>
        </form>
        <section className="session-switch">
          <section className="session-bot-line"></section>
          <p>{otherLinkPretext}</p>
          <Link onClick={this.props.clearErrors} className="session-switch-link" to={otherLinkPath}>{otherLinkVal}</Link>
        </section>
      </section>
    )
  }
}

export default SessionForm;
