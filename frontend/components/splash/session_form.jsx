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
    const demoUser = {username: 'demo', password: 'password'};
    this.props.demoLogin(demoUser);
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
        <section className="logo session-logo">magnify</section>

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
          <input className="session-submit-button" type="submit" value={submitButton}></input>
        </form>
        <section className="session-switch">
          <section className="session-bot-line"></section>
          <p>{otherLinkPretext}</p>
          <Link className="session-switch-link" to={otherLinkPath}>{otherLinkVal}</Link>
        </section>
      </section>
    )
  }
}

export default SessionForm;
