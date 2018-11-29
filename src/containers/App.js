import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setMessage } from '../actions/message';
import logo from '../images/logo.svg';
import '../styles/App.css';

class App extends Component {
  componentDidMount() {
    if(!this.props.message) {
        this.props.updateMessage("Hi, I'm from client!");
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <p>
            Redux: { this.props.message }
          </p>
        </header>
      </div>
    );
  }
}

export default connect(
  ({ app }) => ({
    message: app.message,
  }),
  dispatch => ({
    updateMessage: (txt) => dispatch(setMessage(txt)),
  })
)(App);
